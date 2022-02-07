import { h, Fragment, uni2Platform, uniComponent } from '@uni-component/core'
import { CubeButton as UniButton } from '@uni-component/example'
import { uni2Vue } from '../../src'

export const CubeButton = uni2Vue(UniButton, (props, state, { renders }) => {
  const { n, rootClass, clickAction } = state
  const t = props.text ? props.text : renders.defaultRender && renders.defaultRender()
  return (
    <button class={rootClass} type={props.type} onClick={clickAction}>
      <span>{ t } { n }</span>
    </button>
  )
})

export const PlatformButton = uni2Platform(UniButton, (props, state, { renders }) => {
  const { n, rootClass, clickAction } = state
  const t = props.text ? props.text : renders.defaultRender && renders.defaultRender()
  return (
    <button class={rootClass} type={props.type} onClick={clickAction}>
      <span>{ t } { n }</span>
    </button>
  )
})

// just for test

const sfa = uniComponent('dsaf', ['a', 'b'], (name, props) => {
  return {}
})
const CCCC = uni2Vue(sfa)
const PCCCC = uni2Platform(sfa)
const sfa2 = uniComponent('dsafsdf', (name) => {
  return {}
})
const CCCC2 = uni2Vue(sfa2)
const PCCCC2 = uni2Platform(sfa2)

const Appp = () => {
  return (
    <Fragment>
      <CubeButton type='button' primary>xxx</CubeButton>
      <CCCC a="" b="dad"></CCCC>
      <PCCCC a={1} b=""></PCCCC>
      <CCCC2></CCCC2>
      <PCCCC2></PCCCC2>
    </Fragment>
  )
}
