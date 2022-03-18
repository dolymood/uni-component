import { h, uniComponent, provide, uni2Platform, PropType, ref } from '@uni-component/core'
import { formProvide } from '../_/form/form'

const UniForm = uniComponent('uni-form', {
  onSubmit: Function as PropType<(detail: {value: Record<string, any>}) => void>,
  onReset: Function as PropType<() => void>
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
UniForm.render = function (_, state, { renders }) {
  const { rootClass, onSubmit, onReset } = state
  return (
    <form
      class={rootClass}
      onSubmit={onSubmit}
      onReset={onReset}
    >
      { renders.defaultRender && renders.defaultRender() }
    </form>
  )
}

export const Form = uni2Platform(UniForm)
