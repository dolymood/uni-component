import { h, uniComponent, uni2Platform } from '@uni-component/core'

const UniBlock = uniComponent('uni-block', () => {})

UniBlock.render = function (_, __, { renders }) {
  return renders.defaultRender && renders.defaultRender()
}

export const Block = uni2Platform(UniBlock)
