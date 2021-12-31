import {
  h,
  ExtractPropTypes,
  GetState,
  Context
} from '@uni-component/core'
import { computed } from '@uni-store/core'
import { useHover, props as hoverProps } from '../hover'
import { props as containerProps, useContainer } from '../container'

export const props = {
  ...hoverProps,
  ...containerProps,
  hoverStartTime: {
    type: Number,
    default: 50
  },
  hoverStayTime: {
    type: Number,
    default: 400
  },
  animation: String
}

export type Props = ExtractPropTypes<typeof props>

export const useView = (props: Props) => {
  const {
    rootClass,
    onTouchStart,
    onTouchEnd
  } = useHover(props)
  const {
    setEleRef
  } = useContainer<HTMLDivElement>(props, {
    onTouchStart,
    onTouchEnd
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

  return {
    rootClass,
    attrs,
    setEleRef
  }
}

export type State = GetState<ReturnType<typeof useView>>

export const render = (_: Props, state: State, { slots }: Context) => {
  const {
    rootClass,
    attrs,
    setEleRef
  } = state
  return (
    <div
      class={rootClass}
      ref={setEleRef}
      { ...attrs }
    >
      { slots.default && slots.default() }
    </div>
  )
}
