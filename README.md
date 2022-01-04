# uni-component [![npm](https://badgen.net/npm/v/@uni-component/core)](https://www.npmjs.com/package/@uni-component/core) [![build status](https://github.com/dolymood/uni-component/workflows/test/badge.svg)](https://github.com/dolymood/uni-component/actions/workflows/test.yml) [![coverage](https://badgen.net/codecov/c/github/dolymood/uni-component)](https://codecov.io/github/dolymood/uni-component)

Unified Component: Write once component, Run in multi lib/platform.

Depend on [@uni-store](https://github.com/dolymood/uni-store).

Unified Component core parts:

- `setup`, like vue setup, just define the component state. The state can be used to any platforms. This should be contained pure component state logic.
- `render`, optional. This should be used when platform support render function, like : web platform or miniapp which supported runtime render.

## Installation

```bash
pnpm add @uni-component/core
# or with yarn
yarn add @uni-component/core
# or with npm
npm install @uni-component/core
```

## Usage

More cases, see [@uni-component/components](https://github.com/dolymood/uni-component/tree/main/packages/components).

### Define a component

```ts
import {
  h,
  PropType,
  uniComponent
} from '@uni-component/core'
import {
  computed,
  ref
} from '@uni-store/core'

// pure setup state
export const UniButton = uniComponent('uni-button', {
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  text: String,
  icon: String,
  primary: Boolean,
  onClick: Function as PropType<(e?: MouseEvent) => any>
}, (name, props) => {
  const n = ref(0)

  const rootClass = computed(() => {
    return {
      [`${name}-primary`]: props.primary
    }
  })

  const clickAction = (e?: MouseEvent) => {
    n.value += 1
    // do others
    props.onClick && props.onClick(e)
  }

  return {
    n,
    rootClass,
    clickAction
  }
})

// platform component with pure render function
export const CubeButton = uni2Platform(UniButton, (props, state, context) => {
  const { type, text } = props
  // rootClass always contain Component name, like 'cube-button'
  const { rootClass, n, clickAction } = state
  const t = text ? text : slots.default && slots.default()
  return (
    <button class={rootClass} type={type} onClick={clickAction}>
      <span>{ t } { n }</span>
    </button>
  )
})
```

### With Vue 3

Install:

```bash
pnpm add @uni-component/vue
# or with yarn
yarn add @uni-component/vue
# or with npm
npm install @uni-component/vue
```

Use:

```tsx
/// <reference types="@uni-component/vue/platform" />
import { h } from '@uni-component/core'
import '@uni-component/vue'
import { createApp } from 'vue'

const App = () => {
  return (
    <>
      <CubeButton>child</CubeButton>
      <CubeButton primary={true} text='text'></CubeButton>
    </>
  )
}

createApp(App).mount('#root')
```

> JSX with tsconfig:
> { "jsxFactory": "h" }

### With React

Install:

```bash
pnpm add @uni-component/react
# or with yarn
yarn add @uni-component/react
# or with npm
npm install @uni-component/react
```

Use:

```tsx
/// <reference types="@uni-component/react/platform" />
import { h } from '@uni-component/core'
import '@uni-component/react'
import '@uni-component/react'
import ReactDOM from 'react-dom'

const App = () => {
  return (
    <>
      <CubeButton>child</CubeButton>
      <CubeButton primary={true} text='text'></CubeButton>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

> JSX with tsconfig:
> { "jsxFactory": "h" }

## License

[MIT](http://opensource.org/licenses/MIT)
