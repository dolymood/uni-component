import {
  h,
  uniComponent,
  uni2Platform,
  computed
} from '@uni-component/core'

const UniText = uniComponent('uni-text', {
  selectable: Boolean
}, (name, props) => {
  const rootClass = computed(() => {
    return {
      [`${name}__selectable`]: props.selectable
    }
  })
  return {
    rootClass
  }
})

// for H5
// mini just use Mini components
UniText.render = (_, state, { renders }) => {
  return (
    <span class={ state.rootClass }>
      { renders.defaultRender && renders.defaultRender() }
    </span>
  )
}

export const Text = uni2Platform(UniText)
