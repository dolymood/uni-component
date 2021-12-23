import { h, uniComponent, uni2Platform } from '@uni-component/core'

const UniBlock = uniComponent('uni-block', () => {})

UniBlock.render = function (_, __, { slots }) {
  return slots.default && slots.default()
}

export const Block = uni2Platform(UniBlock)
