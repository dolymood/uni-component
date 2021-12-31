import { h, PropType, uniComponent, uni2Platform } from '@uni-component/core'
import { computed } from '@uni-store/core'
import { props, useContainer } from '../_/container'

export type Type = 'success' | 'success_no_circle' | 'info'| 'warn'| 'waiting'| 'cancel'| 'download'| 'search'| 'clear'
type IconType = Exclude<Type, 'success_no_circle'> | 'success-no-circle'

const UniIcon = uniComponent('uni-icon', {
  ...props,
  type: String as PropType<Type>,
  size: {
    type: [Number, String],
    default: 23
  },
  color: String
}, (_, props) => {
  const { setEleRef } = useContainer(props)
  const iconType = computed(() => {
    return props.type?.replace(/_/g, '-') as IconType
  })

  const rootClass = computed(() => {
    return `weui-icon-${iconType.value}`
  })

  const rootStyle = computed(() => {
    return {
      fontSize: `${props.size}px`,
      color: props.color
    }
  })

  return {
    rootClass,
    rootStyle,
    setEleRef
  }
})

UniIcon.render = function (_, state) {
  const { rootClass, rootStyle, setEleRef } = state

  return (
    <i ref={setEleRef} class={rootClass} style={rootStyle}></i>
  )
}

export const Icon = uni2Platform(UniIcon)
