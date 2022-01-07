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


```tsx
/// <reference types="@uni-component/vue/platform" />
import { h } from '@uni-component/core'
import { initPlatform } '@uni-component/vue'
import { createApp } from 'vue'

initPlatform()

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
