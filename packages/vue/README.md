# @uni-component/vue [![npm](https://badgen.net/npm/v/@uni-component/vue)](https://www.npmjs.com/package/@uni-component/vue) [![build status](https://github.com/dolymood/uni-component/workflows/test/badge.svg)](https://github.com/dolymood/uni-component/actions/workflows/test.yml) [![coverage](https://badgen.net/codecov/c/github/dolymood/uni-component)](https://codecov.io/github/dolymood/uni-component)

Unified component for Vue 3.

## Installation

```bash
pnpm add @uni-component/core @uni-component/vue
# or with yarn
yarn add @uni-component/core @uni-component/vue
# or with npm
npm install @uni-component/core @uni-component/vue
```

## Usage

UniComponent to React component:

```tsx
import { uni2Vue } from '@uni-component/vue'

export const VueButton = uni2Vue(UniButton, (props, state, { renders }) => {
  const {
    n,
    rootClass,
    clickAction
  } = state
  const t = props.text ? props.text : renders.defaultRender && renders.defaultRender()
  return (
    <button className={rootClass} type={props.type} onClick={() => clickAction()}>
      <span>
        <>
          {t}
          {` ${n}`}
        </>
      </span>
      {props.appendRender?.()}
    </button>
  )
})
```

Entry:

```tsx
/// <reference types="@uni-component/vue/platform" />
import { h, Fragment } from '@uni-component/core'
import '@uni-component/vue'
import { createApp } from 'vue'

const App = () => {
  return (
    <>
      <VueButton>child</VueButton>
      <VueButton primary={true} text='text'></VueButton>
    </>
  )
}

createApp(App).mount('#root')
```

> JSX with tsconfig:
> { "jsxFactory": "h", "jsxFragmentFactory": "Fragment" }
