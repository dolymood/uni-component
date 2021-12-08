import { h } from 'vue'
import { CubeButton as UniButton } from '@uni-component/example'
import { uni2Vue } from '../../src'

export const CubeButton = uni2Vue(UniButton, (props, state, { slots }) => {
  const { rootClass, clickAction } = state
  return (
    <button class={rootClass} type={props.type} onClick={clickAction}>
      <span>{ slots.default ? slots.default() : props.text }</span>
    </button>
  )
})

// just for test
const Appp = () => {
  return <CubeButton primary>xxx</CubeButton>
}
