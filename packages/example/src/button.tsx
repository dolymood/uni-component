import { h } from '@uni-component/core'
import {
  computed
} from '@uni-store/core'
import {
  PropType,
  uniComponent
} from '@uni-component/core'

const CubeView = uniComponent('cube-view', (name) => {
  const clickAction = () => {
    console.log('xx')
  }
  return {
    clickAction
  }
})

const CCC = uniComponent('cube-cc', ['a', 'b'], (name, props) => {
  return {}
})

export const CubeButton = uniComponent('cube-button', {
  xxx: Object,
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  text: String,
  icon: String,
  primary: Boolean,
  onClick: Function as PropType<(e?: MouseEvent) => any>
}, (name, props) => {
  const rootClass = computed(() => {
    return {
      [`${name}-primary`]: props.primary
    }
  })

  const clickAction = (e?: MouseEvent) => {
    // do others
    props.onClick && props.onClick(e)
  }

  return {
    rootClass,
    clickAction
  }
})

// just test
const App = () => {
  return (
    <>
      <CubeView>xxxxx</CubeView>
      <CubeButton>sdaf</CubeButton>
      <CubeButton primary={false}>sdaf</CubeButton>
      <CCC></CCC>
    </>
  )
}