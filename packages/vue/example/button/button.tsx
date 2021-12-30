import { h } from 'vue'
import { CubeButton as UniButton } from '@uni-component/example'
import { uni2Vue } from '../../src'

export const CubeButton = uni2Vue(UniButton, (props, state, { slots }) => {
  const { n, rootClass, clickAction } = state
  const t = props.text ? props.text : slots.default && slots.default()
  return (
    <button class={rootClass} type={props.type} onClick={clickAction}>
      <span>{ t } { n }</span>
    </button>
  )
})

// just for test
const Appp = () => {
  return <CubeButton primary>xxx</CubeButton>
}
