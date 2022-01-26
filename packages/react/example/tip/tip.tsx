import React from 'react'
import { uni2React } from '../../src'
import { CubeTip as UniTip } from '@uni-component/example'

export const CubeTip = uni2React(UniTip, (props, state, { renders }) => {
  return (
    <span className={state.rootClass}>{ renders.defaultRender?.() }</span>
  )
})
