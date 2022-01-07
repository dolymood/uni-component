# @uni-component/react [![npm](https://badgen.net/npm/v/@uni-component/react)](https://www.npmjs.com/package/@uni-component/react) [![build status](https://github.com/dolymood/uni-component/workflows/test/badge.svg)](https://github.com/dolymood/uni-component/actions/workflows/test.yml) [![coverage](https://badgen.net/codecov/c/github/dolymood/uni-component)](https://codecov.io/github/dolymood/uni-component)

Unified component for React.

## Installation

```bash
pnpm add @uni-component/core @uni-component/react
# or with yarn
yarn add @uni-component/core @uni-component/react
# or with npm
npm install @uni-component/core @uni-component/react
```

## Usage

```tsx
/// <reference types="@uni-component/react/platform" />
import { h } from '@uni-component/core'
import { initPlatform } '@uni-component/react'
import ReactDOM from 'react-dom'

initPlatform()

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
