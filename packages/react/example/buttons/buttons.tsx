import React from 'react'
import { uni2React } from '../../src'
import { CubeButtons as UniButtons } from '@uni-component/example'

export const CubeButtons = uni2React(UniButtons, (props, state) => {
  const { rootClass } = state
  return (
    <div className={rootClass}>
      { props.children }
    </div>
  )
})

// just for test
const Appp = () => {
  return <CubeButtons>xxx</CubeButtons>
}
