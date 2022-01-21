import {
  h,
  uniComponent,
  provide,
  uni2Platform,
  useRef
} from '@uni-component/core'
import { ref, computed, Ref } from '@uni-store/core'

export const movableAreaProvide = 'uni-movable-area-provide'

export interface MovableAreaProvide {
  ele: Ref<HTMLDivElement>
  wrapperClass: string
  scaleArea: boolean
}

const UniMovableArea = uniComponent('uni-movable-area', {
  scaleArea: Boolean,
  width: {
    type: Number,
    default: 10
  },
  height: {
    type: Number,
    default: 10
  }
}, (name, props) => {
  const ele = ref<HTMLDivElement>()
  const setEleRef = useRef(ele)

  const rootStyle = computed(() => {
    return {
      width: props.width + 'px',
      height: props.height + 'px'
    }
  })

  const wrapperClass = `${name}-wrapper`

  provide(movableAreaProvide, {
    ele,
    wrapperClass,
    scaleArea: props.scaleArea
  })

  return {
    rootStyle,
    wrapperClass,
    setEleRef
  }
})

// for H5
// mini just use Mini components
UniMovableArea.render = function (_, state, { renders }) {
  const { rootClass, rootStyle, wrapperClass, setEleRef } = state
  return (
    <div class={rootClass} style={rootStyle} ref={setEleRef}>
      <div class={wrapperClass}>
        { renders.defaultRender && renders.defaultRender() }
      </div>
    </div>
  )
}

export const MovableArea = uni2Platform(UniMovableArea)
