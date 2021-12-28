import {
  h,
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import {
  computed
} from '@uni-store/core'

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
UniText.render = (_, state, { slots }) => {
  return (
    <span class={ state.rootClass }>
      { slots.default && slots.default() }
    </span>
  )
}

export const Text = uni2Platform(UniText)
