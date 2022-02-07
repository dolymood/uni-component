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

UniComponent to React component:

```tsx
import { uni2React } from '@uni-component/react'

export const ReactButton = uni2React(UniButton, (props, state, { renders }) => {
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
/// <reference types="@uni-component/react/platform" />
import { h, Fragment } from '@uni-component/core'
import '@uni-component/react'
import ReactDOM from 'react-dom'

const App = () => {
  return (
    <>
      <ReactButton>child</ReactButton>
      <ReactButton primary={true} text='text'></ReactButton>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```

> JSX with tsconfig:
> { "jsxFactory": "h", "jsxFragmentFactory": "Fragment" }
