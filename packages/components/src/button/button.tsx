import {
  h,
  PropType,
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { computed } from '@uni-store/core'
import { useHover, props } from '../_/hover'

const UniButton = uniComponent('uni-button', {
  ...props,
  hoverClass: {
    type: String,
    default: 'button-hover'
  },
  type: {
    type: String as PropType<'default' | 'primary' | 'warn'>,
    default: 'default'
  },
  size: {
    type: String as PropType<'normal' | 'mini'>,
    default: 'normal'
  },
  plain: Boolean,
  loading: Boolean,
  formType: String as PropType<'submit' | 'reset'>,
  onSubmit: Function as PropType<() => void>,
  onReset: Function as PropType<() => void>
}, (name, props) => {
  const {
    rootClass: hoverClass,
    onTouchStart,
    onTouchEnd
  } = useHover(props, undefined, () => {
    if (props.formType === 'submit') {
      props.onSubmit && props.onSubmit()
    } else if (props.formType === 'reset') {
      props.onReset && props.onReset()
    }
  })
  const rootClass = computed(() => {
    return [
      {
        [`${name}-type_${props.type}`]: true,
        [`${name}-plain`]: props.plain,
        [`${name}-loading`]: props.loading,
        [`${name}-size_${props.size}`]: true
      },
      hoverClass.value
    ]
  })

  return {
    rootClass,
    onTouchStart,
    onTouchEnd
  }
})

// for H5
// mini just use Mini components
UniButton.render = (props, state, { renders }) => {
  const { disabled, loading, formType } = props
  const { rootClass, onTouchStart, onTouchEnd } = state
  return (
    <button
      class={ rootClass }
      type={ formType }
      disabled={ disabled }
      onTouchStart={ onTouchStart }
      onTouchEnd={ onTouchEnd }
    >
      {loading && <i class='weui-loading' />}
      { renders.defaultRender && renders.defaultRender() }
    </button>
  )
}

export const Button = uni2Platform(UniButton)
