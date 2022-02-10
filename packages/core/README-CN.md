# uni-component [![npm](https://badgen.net/npm/v/@uni-component/core)](https://www.npmjs.com/package/@uni-component/core) [![build status](https://github.com/dolymood/uni-component/workflows/test/badge.svg)](https://github.com/dolymood/uni-component/actions/workflows/test.yml) [![coverage](https://badgen.net/codecov/c/github/dolymood/uni-component)](https://codecov.io/github/dolymood/uni-component)

Unified Component: 实现一次组件，多平台（框架）运行。

组件的逻辑层，依赖[@uni-store](https://github.com/dolymood/uni-store) 实现。底层基于 Vue 3 的 reactivity 包。

Unified Component 核心两部分：

- `setup`, 和 Vue 组件的 setup 很像，用来定义一个组件的状态 state，这个state可以用在多个平台上。其实就是大家理解的组件的纯逻辑层、状态层或者叫 Model 层。
- `render`, 可选，因为在一些平台上，不支持 render 函数的模式（即虚拟DOM这一层），例如小程序等。目前在 Web 上，Vue 和 React 支持都没问题，而且推荐直接 JSX 写。

实际使用的例子：

- **用 uni-component 重构了 [vuetify@next](https://github.com/uni-component/vuetify) 组件库，可以直接在 Vue 3或者React下使用。**
- 也可以查看 [components](https://github.com/dolymood/uni-component/tree/main/packages/components) 获得更多的使用case学习。这个包是一个用来抹平小程序基础组件到Web的基础库，未来可用于“跨端”。

## 安装

```bash
pnpm add @uni-component/core
# or with yarn
yarn add @uni-component/core
# or with npm
npm install @uni-component/core
```

## 使用

想要看更多的一些示例用法，可以参考 [@uni-component/components](https://github.com/dolymood/uni-component/tree/main/packages/components)。

### 定义一个组件

```ts
import {
  h,
  PropType,
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import {
  computed,
  ref
} from '@uni-store/core'

// 必须有的纯的组件状态，个人理解为 headless 无头组件
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

// 利用 render 函数实现平台级的渲染能力，纯渲染
export const CubeButton = uni2Platform(UniButton, (props, state, { renders }) => {
  const { type, text } = props
  // rootClass always contain Component name, like 'cube-button'
  const { rootClass, n, clickAction } = state
  const t = text ? text : (renders.defaultRender && renders.defaultRender())
  return (
    <button class={rootClass} type={type} onClick={clickAction}>
      <span>{ t } { n }</span>
    </button>
  )
})
```

### 和Vue 3搭配

安装：

```bash
pnpm add @uni-component/vue
# or with yarn
yarn add @uni-component/vue
# or with npm
npm install @uni-component/vue
```

使用：

```tsx
/// <reference types="@uni-component/vue/platform" />
import { h, Fragment } from '@uni-component/core'
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
> { "jsxFactory": "h", "jsxFragmentFactory": "Fragment" }

### 和React搭配

安装：

```bash
pnpm add @uni-component/react
# or with yarn
yarn add @uni-component/react
# or with npm
npm install @uni-component/react
```

使用：

```tsx
/// <reference types="@uni-component/react/platform" />
import { h, Fragment } from '@uni-component/core'
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
> { "jsxFactory": "h", "jsxFragmentFactory": "Fragment" }

## 文档

### 定义纯状态 - headless无头组件

个人观点，组件的纯逻辑状态其实就是headless无头组件。

使用的是 `uniComponent` API 来定义。

对象形式定义props：

```ts
import { uniComponent, classNames, UniNode, PropType } from '@uni-component/core'

const UniXxYy = uniComponent('uni-xx-yy', {
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  text: String,
  icon: String,
  primary: Boolean,
  onClick: Function as PropType<(e?: MouseEvent) => any>,
  xxRender: Function as PropType<(param: {}) => UniNode | undefined>,
}, (name, props, context) => {
  // name is 'UniXxYy'
  const n = ref(0)

  const rootClass = computed(() => {
    return {
      [`${name}-primary`]: props.primary
    }
  })
  // other class you should always use classNames
  const otherClass = computed(() => {
    return classNames({
      [`${name}-child-xx`]: props.type === 'reset'
    })
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
```

**注意：`xxRender` 这样类似的 prop 会被当做传入的 render 函数对待，也就是 React 概念中的 render function，或者类似于 Vue 中的作用域插槽。**

数组形式的 props：

```ts
const UniXxYy = uniComponent('uni-xx-yy', ['a', 'b'], (name, props, context) => {
  // name is 'UniXxYy'
  // props.a and props.b can be any value
  // ...
  return {
    // ...
  }
})
```

无props：

```ts
const UniXxYy = uniComponent('uni-xx-yy', (name, props, context) => {
  // name is 'UniXxYy'
  // ...
  return {
    // ...
  }
})
```

说明下出现的 `context` 参数：
```ts
{
  // renders 会包含虽有的形如 `xxRender` 的 props，他们的集合
  // renders.defaultRender() 是用来替换 React 中的 `props.children` 或者 Vue 中的 `slots.default` 概念。其实就是组件的默认渲染内容。
  renders: Record<string, (...args: any[]) => any>
  // 所有的传入属性（除声明了 props 之外的传入的属性），不包含 ref key
  attrs: Record<string, any>
  // 除了 class style id 之外的所有属性
  $attrs: Record<string, any>
  // 使用组件的时候传入的原始的props，是不包含props默认值处理逻辑的
  nodeProps?: Record<string, any> | null
}
```

### 定义平台式组件

> 可选的。

使用 `uni2Platform(UniComponent, render: (props, state, context) => UniNode | undefined)` API。

- `UniComponent` 通过`uniComponent()`定义的headless无头组件
- `render()` 纯的渲染函数
  - 关于 `state` 参数：
    ```ts
    {
      // 一定会有 rootClass
      rootClass: string,
      // 一定会有 rootStyle
      rootStyle: {[key: string]: 'string value'},
      // 一定会有 rootId
      rootId: string | undefined
      // other state with your custom state
      // n,
      // xxAction,
      //...
    }
    ```

Demo:

```tsx
// platform component with pure render function
const XxYy = uni2Platform(UniXxYy, (props, state, { renders }) => {
  const { type, text } = props
  // rootClass 永远会包含当前组件的名字，当前场景 就是 'uni-xx-yy'
  const { rootClass, rootStyle, rootId, n, clickAction } = state
  const t = text ? text : (renders.defaultRender && renders.defaultRender())
  return (
    <button id={rootId} class={rootClass} style={rootStyle} type={type} onClick={clickAction}>
      <span>{ t } { n }</span>
    </button>
  )
})
```

### 引用DOM元素或者组件ref

使用 `useRef` API 以及 `ref` 属性。

```ts
import { useRef } from '@uni-component/core'
const UniXxYy = uniComponent('uni-xx-yy', (name) => {
  // name is 'UniXxYy'
  // ele的值就是 div 元素
  const ele = ref<HTMLElement>()
  const setEleRef = useRef(ele)

  // buttonComponent 的value就是CubeButton组件的 state 值
  const buttonComponent = ref<{
    n: number,
    clickAction: (e?: MouseEvent) => void
  }>()
  const setButtonComponentRef = useRef(buttonComponent)
  return {
    setEleRef,
    setButtonComponentRef,
  }
})
```

render:

```tsx
const XxYy = uni2Platform(UniXxYy, (props, state) => {
  const { setEleRef, setButtonComponentRef } = state
  // 模板中设置 ref 属性
  return (
    <div ref={setEleRef}>
      <CubeButton ref={setButtonComponentRef}>xx</CubeButton>
    </div>
  )
})
```

**注意：当引用一个组件的时候，值就是组件实例的 state**

### 生命周期

目前仅提供3个生命周期：挂载后 `mounted`, 更新后 `updated` and 卸载后`unmounted`.

```ts
import { onMounted, onUpdated, onUnmounted } from '@uni-component/core'
const UniXxYy = uniComponent('uni-xx-yy', (name) => {
  onMounted(() => {
    console.log('mounted')
  })
  onUpdated(() => {
    console.log('updated')
  })
  onUnmounted(() => {
    console.log('unmounted')
  })
  return {
    // ...
  }
})
```

### Provide 和 Inject

和Vue 3 的[Provide / Inject](https://v3.cn.vuejs.org/guide/component-provide-inject.html) 一样。

父组件/上层组件提供数据：

```ts
// parent component
import { provide } from '@uni-component/core'

const UniXxYy = uniComponent('uni-xx-yy', (name) => {
  provide('xx-key', {
    // xx: xxValue
    // ...
  })
  return {
    // ...
  }
})
```

子组件注入上层提供的数据：

```ts
// child component
import { inject } from '@uni-component/core'

const UniXxYyChild = uniComponent('uni-xx-yy-child', (name) => {
  // 这种情况无默认值
  // const xxProvide = inject('xx-key')
  // with default value
  // 第二个参数 默认值
  const xxYyProvideValue = inject('xx-key', {
    // xx: defaultValue
    // ...
  })
  return {
    // ...
  }
})
```

### 其他 API

- `classNames()`, 帮助你处理元素 class 的，直接引用的就是 [classnames](https://www.npmjs.com/package/classnames)。
- `const mergedStyle = mergeStyle(stringStyle, objectStyle, ...(string or object styles))`, 合并样式的，结果为样式对象。注意，样式的key应该是驼峰命名法。

## License

[MIT](http://opensource.org/licenses/MIT)
