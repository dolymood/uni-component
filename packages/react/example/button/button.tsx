import React from 'react'
import { uni2React } from '../../src'
import { CubeButton as UniButton } from '@uni-component/example'

export const CubeButton = uni2React(UniButton, (props, state, { renders }) => {
  const {
    n,
    rootClass,
    clickAction
  } = state
  const t = props.text ? props.text : renders.defaultRender && renders.defaultRender()
  return (
    <button className={rootClass} type={props.type} onClick={() => clickAction()}>
      <span>{ `${t} ${n}` }</span>
    </button>
  )
})

// just for test
const Appp = () => {
  return <CubeButton primary={false}>xxx</CubeButton>
}
