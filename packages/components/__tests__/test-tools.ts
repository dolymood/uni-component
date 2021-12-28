///// <reference types="../../react/platform" />

import { h } from '@uni-component/core'
import '@uni-component/react'
import { nextTick } from '@uni-store/core'
import {
  act,
  cleanup,
  fireEvent,
  render
} from '@testing-library/react'

afterEach(cleanup)

export {
  h
}

export const mount = render

export const actAsync = async (handler: Function) => {
  await act(async () => {
    await handler()
    await nextTick()
  })
}

export const actClickEvent = async (ele: Element) => {
  await actAsync(async () => {
    fireEvent.click(ele)
  })
}

export const delay = async (time = 5) => {
  await new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}
