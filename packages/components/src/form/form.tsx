import { h, uniComponent, provide, uni2Platform } from '@uni-component/core'
import { ref } from '@uni-store/core'
import { formProvide } from '../_/form/form'

const UniForm = uniComponent('uni-form', {
  onSubmit: Function,
  onReset: Function
}, (_, props) => {
  const value = ref<Record<string, any>>({})

  provide(formProvide, {
    value,
    hash: {}
  })

  const onSubmit = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()

    props.onSubmit && props.onSubmit({
      value: value.value
    })
  }

  const onReset = (e: Event) => {
    e.stopPropagation()
    e.preventDefault()

    props.onReset && props.onReset()
  }

  return {
    onSubmit,
    onReset
  }
})

// for H5
// mini just use Mini components
UniForm.render = function (_, state, { slots }) {
  const { rootClass, onSubmit, onReset } = state
  return (
    <form
      class={rootClass}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      { slots.default && slots.default() }
    </form>
  )
}

export const Form = uni2Platform(UniForm)
