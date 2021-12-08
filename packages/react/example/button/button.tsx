import { uni2React } from '../../src'
import { CubeButton as UniButton } from '@uni-component/example'

export const CubeButton = uni2React(UniButton, (props, state) => {
  const {
    rootClass,
    clickAction
  } = state
  return (
    <button className={rootClass} type={props.type} onClick={() => clickAction()}>
      <span>{ props.text ? props.text : props.children }</span>
    </button>
  )
})

// just for test
const Appp = () => {
  return <CubeButton primary={false}>xxx</CubeButton>
}
