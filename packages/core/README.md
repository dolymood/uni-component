# uni-component [![npm](https://badgen.net/npm/v/@uni-component/core)](https://www.npmjs.com/package/@uni-component/core) [![build status](https://github.com/dolymood/uni-component/workflows/test/badge.svg)](https://github.com/dolymood/uni-component/actions/workflows/test.yml) [![coverage](https://badgen.net/codecov/c/github/dolymood/uni-component)](https://codecov.io/github/dolymood/uni-component)

Unified Component: Write once component, Run in multiple lib/platform.

Depend on [@uni-store](https://github.com/dolymood/uni-store).

Unified Component core parts:

- `setup`, like vue setup, just define the component state. The state can be used to any platforms. This should be contained pure component state logic.
- `render`, optional. This should be used when platform support render function, like : web platform or miniapp which supported runtime render.

**Refactor [vuetify@next](https://github.com/uni-component/vuetify) with uni-component.**

Or see [components](https://github.com/dolymood/uni-component/tree/main/packages/components) for more uni-component usage cases.

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
export const CubeButton xx= uni2Platform(UniButton, (props, state, { renders }) => {
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

## Documentation

### Define pure state - Headless Component

In my opinion, the pure state is a headless component.

Use `uniComponent` API.

Object props:

```ts
import { uniComponent, classNames, UniNode } from '@uni-component/core'

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

**Notice: `xxRender` prop will be treated as render function(React - render function, vue - scope slot)**

Array props:

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

No props:

```ts
const UniXxYy = uniComponent('uni-xx-yy', (name, props, context) => {
  // name is 'UniXxYy'
  // ...
  return {
    // ...
  }
})
```

About `context` param
```ts
{
  // renders contained all `xxRender` in props
  // renders.defaultRender() is used to replace `props.children` in react and `slots.default` in vue
  renders: Record<string, (...args: any[]) => any>
  // all element attrs, no ref and key
  attrs: Record<string, any>
  // element attrs without `class, style, id`
  $attrs: Record<string, any>
  // original props setted by usage case
  // without default props
  nodeProps?: Record<string, any> | null
}
```

### Define platform component

> This is optional.

Use `uni2Platform(UniComponent, render: (props, state, context) => UniNode | undefined)` API.

- `UniComponent` headless component, the `uniComponent()` result
- `render()` pure render function.
  - About `state` param
    ```ts
    {
      rootClass: string,
      rootStyle: {[key: string]: 'string value'},
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
  // rootClass always contain Component name, like 'uni-xx-yy'
  const { rootClass, rootStyle, rootId, n, clickAction } = state
  const t = text ? text : (renders.defaultRender && renders.defaultRender())
  return (
    <button id={rootId} class={rootClass} style={rootStyle} type={type} onClick={clickAction}>
      <span>{ t } { n }</span>
    </button>
  )
})
```

### Reference a DOM element or Component

Use `useRef` API and `ref` attribute.

```ts
import { useRef } from '@uni-component/core'
const UniXxYy = uniComponent('uni-xx-yy', (name) => {
  // name is 'UniXxYy'
  const ele = ref<HTMLElement>()
  const setEleRef = useRef(ele)

  // buttonComponent will be the state of CubeButton
  // defined in UniButton
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
  return (
    <div ref={setEleRef}>
      <CubeButton ref={setButtonComponentRef}>xx</CubeButton>
    </div>
  )
})
```

**Notice: The ref value will be this component's state result when referenced a component**

### Lifecycles

Only 3 lifecycles: `mounted`, `updated` and `unmounted`.

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

### Provide and Inject

Like vue 3 [Provide / Inject](https://v3.vuejs.org/guide/composition-api-provide-inject.html).

Provide:

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

Inject:

```ts
// child component
import { inject } from '@uni-component/core'

const UniXxYyChild = uniComponent('uni-xx-yy-child', (name) => {
  // const xxProvide = inject('xx-key')
  // with default value
  const xxYyProvideValue = inject('xx-key', {
    // xx: defaultValue
    // ...
  })
  return {
    // ...
  }
})
```

### Other API

- `classNames()`, process element class names. Same as [classnames](https://www.npmjs.com/package/classnames).
- `const mergedStyle = mergeStyle(stringStyle, objectStyle, ...(string or object styles))`, merge styles. `mergedStyle` is an object.

## License

[MIT](http://opensource.org/licenses/MIT)
