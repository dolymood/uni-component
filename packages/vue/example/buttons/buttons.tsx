import { h } from 'vue'
// jsx using for jest test
import { jsx } from '../vue-shim'
import { CubeButtons as UniButtons } from '@uni-component/example'
import { uni2Vue } from '../../src'

export const CubeButtons = uni2Vue(UniButtons, (_, state, { slots }) => {
  const { rootClass } = state
  return (
    <div class={rootClass}>
      { slots.default ? slots.default() : ''}
    </div>
  )
})
