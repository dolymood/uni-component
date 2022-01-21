import React from 'react'
import { uni2React } from '../../src'
import { CubeButtons as UniButtons } from '@uni-component/example'
import { CubeButton } from '../button/button'

export const CubeButtons = uni2React(UniButtons, (props, state, { renders }) => {
  const { rootClass } = state
  return (
    <div className={rootClass}>
      { renders.defaultRender && renders.defaultRender() }
    </div>
  )
})

// just for test
const Appp = () => {
  return (
    <CubeButtons>
      <CubeButton></CubeButton>
    </CubeButtons>
  )
}
