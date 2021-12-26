import React from 'react'
import { h, mount } from './test-tools'
import { nextTick } from '@uni-store/core'
import { Block } from '../src'

describe('Block', () => {
  it('有一个空的占位元素，并且 slot 能够使用', async () => {
    const App = () => {
      return (
        <Block>
          <div />
          <div />
        </Block>
      )
    }

    const rendered = mount(<App />)

    await nextTick()

    expect(rendered.container.childNodes.length).toBe(2)
  })
})
