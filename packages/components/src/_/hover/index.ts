import {
  ref,
  computed,
  ExtractPropTypes
} from '@uni-component/core'

export const props = {
  disabled: Boolean,
  hoverClass: String,
  hoverStartTime: {
    type: Number,
    default: 20
  },
  hoverStayTime: {
    type: Number,
    default: 70
  }
}

export type Props = ExtractPropTypes<typeof props>

export const useHover = (
  props: Props,
  touchStartAction?: Function,
  touchEndAction?: Function
) => {
  const hover = ref(false)
  const touch = ref(false)

  const rootClass = computed(() => {
    return {
      [`${props.hoverClass}`]: !props.disabled && hover.value
    }
  })

  const enableHoverClass = computed(() => props.hoverClass && !props.disabled)

  const onTouchStart = () => {
    if (props.disabled) {
      return
    }

    touch.value = true
    if (enableHoverClass.value) {
      setTimeout(() => {
        if (touch.value) {
          hover.value = true
        }
      }, props.hoverStartTime)
    }
    touchStartAction && touchStartAction()
  }

  const onTouchEnd = () => {
    if (props.disabled) {
      return
    }

    touch.value = false
    if (enableHoverClass.value) {
      setTimeout(() => {
        if (!touch.value) {
          hover.value = false
        }
      }, props.hoverStayTime)
    }

    touchEndAction && touchEndAction()
  }

  return {
    rootClass,
    onTouchStart,
    onTouchEnd
  }
}
