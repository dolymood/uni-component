import {
  h,
  PropType,
  UniNode,
  uniComponent,
  computed,
  ref
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
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  text: String,
  icon: String,
  primary: Boolean,
  onClick: Function as PropType<(e?: MouseEvent) => any>,
  appendRender: Function as PropType<() => UniNode | undefined>
}, (name, props) => {
  const n = ref(0)

  const rootClass = computed(() => {
    return {
      [`${name}-primary`]: props.primary
    }
  })

  const clickAction = (e?: MouseEvent) => {
    n.value += 1
    // do others
    props.onClick && props.onClick(e)
  }

  return {
    n,
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
