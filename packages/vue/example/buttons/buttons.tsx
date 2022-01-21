import { h } from '@uni-component/core'
import { CubeButtons as UniButtons } from '@uni-component/example'
import { uni2Vue } from '../../src'

export const CubeButtons = uni2Vue(UniButtons, (_, state, { renders }) => {
  const { rootClass } = state
  return (
    <div class={rootClass}>
      { renders.defaultRender ? renders.defaultRender() : ''}
    </div>
  )
})
