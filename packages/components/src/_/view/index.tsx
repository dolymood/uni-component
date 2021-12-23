import {
  h,
  ExtractPropTypes,
  GetState,
  Context
} from '@uni-component/core'
import { computed } from '@uni-store/core'
import { useHover, props as hoverProps } from '../hover'

export const props = {
  ...hoverProps,
  hoverStartTime: {
    type: Number,
    default: 50
  },
  hoverStayTime: {
    type: Number,
    default: 400
  },
  animation: String,
  onLongPress: Function
}

export type Props = ExtractPropTypes<typeof props>

export const useView = (props: Props) => {
  let timeoutEvent: NodeJS.Timeout
  let startTime = 0

  const {
    rootClass,
    onTouchStart,
    onTouchEnd
  } = useHover(props, () => {
    timeoutEvent = setTimeout(() => {
      props.onLongPress && props.onLongPress()
    }, 350)
    startTime = Date.now()
  }, () => {
    const spanTime = Date.now() - startTime
    if (spanTime < 350) {
      clearTimeout(timeoutEvent)
    }
  })

  const attrs = computed(() => {
    const attrs = {} as Record<string, string>
    const animation = props.animation
    if (!!animation) {
      attrs['animation'] = animation
      attrs['data-animation'] = animation
    }
    return attrs
  })

  const onTouchMove = () => {
    clearTimeout(timeoutEvent)
  }

  return {
    rootClass,
    attrs,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}

export type State = GetState<ReturnType<typeof useView>>

export const render = (_: Props, state: State, { slots }: Context) => {
  const {
    rootClass,
    attrs,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  } = state
  return (
    <div
      class={rootClass}
      { ...attrs }
      onTouchStart={ onTouchStart }
      onTouchMove={ onTouchMove }
      onTouchEnd={ onTouchEnd }
    >
      { slots.default && slots.default() }
    </div>
  )
}
