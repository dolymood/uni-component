// @ts-check
import path from 'path'
import ts from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import styles from 'rollup-plugin-styles'

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}

const masterVersion = require('./package.json').version
const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}
const name = packageOptions.filename

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} dolymood (dolymood@gmail.com)
  * @license MIT
  */`

// ensure TS checks only once for each build
let hasTSChecked = false

const outputConfigs = {
  // each file name has the format: `dist/${name}.${format}.js`
  // format being a key of this object
  mjs: {
    file: pkg.module,
    format: `es`,
  },
  cjs: {
    file: pkg.module.replace('mjs', 'cjs'),
    format: `cjs`,
  },
  global: {
    file: pkg.unpkg,
    format: `iife`,
  },
  browser: {
    file: `dist/${name}.esm-browser.js`,
    format: `es`,
  },
}

const packageBuilds = Object.keys(outputConfigs)
const packageConfigs = packageBuilds.map((format) =>
  createConfig(format, outputConfigs[format])
)

// only add the production ready if we are bundling the options
packageBuilds.forEach((buildName) => {
  if (buildName === 'cjs') {
    packageConfigs.push(createProductionConfig(buildName))
  } else if (buildName === 'global') {
    packageConfigs.push(createMinifiedConfig(buildName))
  }
})

export default packageConfigs

function createConfig(buildName, output, plugins = []) {
  output.sourcemap = !!process.env.SOURCE_MAP
  output.banner = banner
  output.externalLiveBindings = false
  output.globals = {
    'react': 'React',
    'vue': 'Vue',
    '@uni-store/core': 'UniStore',
    '@vue/reactivity': 'UniStore',
    '@vue/runtime-core': 'UniStore',
    '@uni-store/react': 'UniStoreReact'
  }

  output.file = resolve(output.file)

  const isProductionBuild = /\.prod\.[cmj]s$/.test(output.file)
  const isGlobalBuild = buildName === 'global'
  const isRawESMBuild = buildName === 'browser'
  const isNodeBuild = buildName === 'cjs'
  const isBundlerESMBuild = buildName === 'browser' || buildName === 'mjs'

  if (isGlobalBuild) output.name = packageOptions.name || 'UniComponent'

  const shouldEmitDeclarations = !hasTSChecked

  // use pnpm install --shamefully-hoist fornow
  // check will be error, but need rts2 fixed it, see https://github.com/ezolenko/rollup-plugin-typescript2/issues/234
  const tsPlugin = ts({
    check: !hasTSChecked,
    tsconfig: resolve('tsconfig.json'),
    cacheRoot: path.resolve(__dirname, './node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations,
      },
      exclude: [
        '**/__tests__',
        'test-dts',
        'platform.d.ts',
        'example/vue',
        'example/react'
      ]
    },
  })
  // we only need to check TS and generate declarations once for each build.
  // it also seems to run into weird issues when checking multiple times
  // during a single build.
  hasTSChecked = true

  const external = [
    'react',
    '@uni-store/core',
    '@uni-store/react',
    '@vue/reactivity',
    '@vue/runtime-core'
  ]
  if (!isGlobalBuild) {
    external.push.apply(external, [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    ])
  }

  const nodePlugins = [nodeResolve(), commonjs()]

  if (process.env.TARGET === 'components') {
    nodePlugins.push(styles({
      mode: ['extract', 'style.css']
    }))
    output.assetFileNames = '[name][extname]'
  }

  return {
    input: resolve('src/index.ts'),
    // Global and Browser ESM builds inlines everything so that they can be
    // used alone.
    external,
    plugins: [
      tsPlugin,
      createReplacePlugin(
        isProductionBuild,
        isBundlerESMBuild,
        // isBrowserBuild?
        isGlobalBuild || isRawESMBuild || isBundlerESMBuild,
        isGlobalBuild,
        isNodeBuild
      ),
      replace({
        preventAssignment: true,
        values: {
          '__VUE_OPTIONS_API__': 'false',
          'process.env.NODE_ENV': `"${(isProductionBuild || isGlobalBuild) ? 'production' : 'development'}"`
        },
      }),
      ...nodePlugins,
      ...plugins,
    ],
    output,
    // onwarn: (msg, warn) => {
    //   if (!/Circular/.test(msg)) {
    //     warn(msg)
    //   }
    // },
  }
}

function createReplacePlugin(
  isProduction,
  isBundlerESMBuild,
  isBrowserBuild,
  isGlobalBuild,
  isNodeBuild
) {
  const replacements = {
    __COMMIT__: `"${process.env.COMMIT}"`,
    __VERSION__: `"${masterVersion}"`,
    __DEV__:
      isBundlerESMBuild || (isNodeBuild && !isProduction)
        ? // preserve to be handled by bundlers
          `(process.env.NODE_ENV !== 'production')`
        : // hard coded dev/prod builds
          JSON.stringify(!isProduction),
    // this is only used during tests
    __TEST__:
      isBundlerESMBuild || isNodeBuild
        ? `(process.env.NODE_ENV === 'test')`
        : 'false',
    // If the build is expected to run directly in the browser (global / esm builds)
    __BROWSER__: JSON.stringify(isBrowserBuild),
    // is targeting bundlers?
    __BUNDLER__: JSON.stringify(isBundlerESMBuild),
    __GLOBAL__: JSON.stringify(isGlobalBuild),
    // is targeting Node (SSR)?
    __NODE_JS__: JSON.stringify(isNodeBuild),
  }
  // allow inline overrides like
  //__RUNTIME_COMPILE__=true yarn build
  Object.keys(replacements).forEach((key) => {
    if (key in process.env) {
      replacements[key] = process.env[key]
    }
  })
  return replace({
    preventAssignment: true,
    values: replacements,
  })
}

function createProductionConfig(format) {
  const extension = format === 'cjs' ? 'cjs' : 'js'
  const descriptor = format === 'cjs' ? '' : `.${format}`
  return createConfig(format, {
    file: `dist/${name}${descriptor}.prod.${extension}`,
    format: outputConfigs[format].format,
  })
}

function createMinifiedConfig(format) {
  const { terser } = require('rollup-plugin-terser')
  return createConfig(
    format,
    {
      file: `dist/${name}.${format === 'global' ? 'iife' : format}.prod.js`,
      format: outputConfigs[format].format,
    },
    [
      terser({
        module: /^esm/.test(format),
        compress: {
          ecma: 2015,
          pure_getters: true,
        },
      }),
    ]
  )
}
