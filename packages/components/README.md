# @uni-component/components [![npm](https://badgen.net/npm/v/@uni-component/components)](https://www.npmjs.com/package/@uni-component/components) [![build status](https://github.com/dolymood/uni-component/workflows/test/badge.svg)](https://github.com/dolymood/uni-component/actions/workflows/test.yml) [![coverage](https://badgen.net/codecov/c/github/dolymood/uni-component)](https://codecov.io/github/dolymood/uni-component)

Unified component components like basic wechat miniprogram components.

TODO:

- refactor

## Installation

```bash
pnpm add @uni-component/core @uni-component/components
# or with yarn
yarn add @uni-component/core @uni-component/components
# or with npm
npm install @uni-component/core @uni-component/components
```

## Usage

```tsx
import { h } from '@uni-component/core'
import {
  View,
  Button,
  Form,
  Input,
  Textarea,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Slider,
  Switch
} from '@uni-component/components'

export default function ViewDemo () {
  return (
    <View class='view-demo'>
      <View>
        <Button>btn</Button>
      </View>
      <View>
        <Form>
          <Input name='input' value='form input'></Input>
          <Textarea name='textarea' value='form textarea'></Textarea>
          <CheckboxGroup name="checkboxGroup">
            <Checkbox value='checkbox1'>checkbox 1</Checkbox>
            <Checkbox value='checkbox2'>checkbox 2</Checkbox>
          </CheckboxGroup>
          <RadioGroup name="radioGroup">
            <Radio value='radio1'>radio 1</Radio>
            <Radio value='radio2'>radio 2</Radio>
          </RadioGroup>
          <Slider value={30}></Slider>
          <Switch type='switch' />
        </Form>
      </View>
    </View>
  )
}
```

> JSX with tsconfig:
> { "jsxFactory": "h" }

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

```ts
// vue/main.ts
/// <reference types="@uni-component/vue/platform" />
import '@uni-component/vue'
import { createApp } from 'vue'

createApp(ViewDemo).mount('#root')
```

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

```ts
// react/main.tsx
/// <reference types="@uni-component/react/platform" />
import { h } from '@uni-component/core'
import '@uni-component/react'
import ReactDOM from 'react-dom'

ReactDOM.render(<ViewDemo />, document.getElementById('root'))
```

## License

First version components are cloned from [taro-components](https://github.com/NervJS/taro/tree/next/packages/taro-components), [mpx](https://github.com/didi/mpx) and refactor to uni-component style.
