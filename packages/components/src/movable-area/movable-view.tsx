import {
  h,
  onMounted,
  onUnmounted,
  PropType,
  uniComponent,
  inject,
  uni2Platform,
  useRef,
  ref,
  watch,
  computed,
  nextTick
} from '@uni-component/core'
import { movableAreaProvide, MovableAreaProvide } from './movable-area'
import BScroll from '@better-scroll/core'
import Movable from '@better-scroll/movable'
import Zoom from '@better-scroll/zoom'

BScroll.use(Movable)
BScroll.use(Zoom)

type MovableDirection = 'none' | 'all' | 'vertical' | 'horizontal'

type Source = 'touch' | 'touch-out-of-bounds' | 'out-of-bounds' | 'friction' | ''

const UniMovableView = uniComponent('uni-movable-view', {
  direction: {
    type: String as PropType<MovableDirection>,
    default: 'none'
  },
  inertia: {
    type: Boolean,
    default: false
  },
  outOfBounds: {
    type: Boolean,
    default: false
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  },
  damping: {
    type: Number,
    default: 20
  },
  friction: {
    type: Number,
    default: 2
  },
  disabled: {
    type: Boolean,
    default: false
  },
  scale: {
    type: Boolean,
    default: false
  },
  scaleMin: {
    type: Number,
    default: 0.5
  },
  scaleMax: {
    type: Number,
    default: 10
  },
  scaleValue: {
    type: Number,
    default: 1
  },
  animation: {
    type: Boolean,
    default: true
  },
  onChange: Function as PropType<(detail: {x: number, y: number, source: Source}) => void>,
  onHtouchmove: Function as PropType<() => void>,
  onVtouchmove: Function as PropType<() => void>,
  onScale: Function as PropType<(detail: {x: number, y: number, scale: number}) => void>,
}, (name, props) => {
  const ele = ref<HTMLDivElement>()
  const setEleRef = useRef(ele)

  const contentClass = `${name}-content`

  const movableArea = inject<MovableAreaProvide>(movableAreaProvide)

  const data = {
    directions: ['none', 'all', 'vertical', 'horizontal'],
    minScrollX: 0,
    maxScrollX: 0,
    minScrollY: 0,
    maxScrollY: 0,
    lastestX: 0,
    lastestY: 0,
    lastestScale: 1,
    isZooming: false,
    isFirstTouch: true,
    source: '' as Source
  }

  const friction = computed(() => {
    const friction = props.friction
    if (!friction || friction < 0) {
      return 2
    }
    return friction
  })

  let bs: BScroll
  let bsOptions = {}
  const init = () => {
    const el = ele.value!
    if (!el.parentElement || el.parentElement.className !== movableArea?.wrapperClass) {
      return
    }
    initOptions()
    const scrollEle = movableArea.ele.value.children[0] as HTMLElement
    const index = ([] as HTMLElement[]).indexOf.call(el.parentElement.children, el) || 0
    bs = new BScroll(scrollEle, {
      specifiedIndexAsContent: index,
      bindToTarget: true,
      freeScroll: false,
      scrollX: false,
      scrollY: false,
      movable: true,
      startX: props.x,
      startY: props.y,
      bounce: props.outOfBounds,
      bounceTime: 800 / (props.damping / 20),
      probeType: 3,
      ...bsOptions
    })
    const BehaviorHooks = bs.scroller.scrollBehaviorY.hooks
    const actionsHandlerHooks = bs.scroller.actionsHandler.hooks
    const scrollerHooks = bs.scroller.hooks
    bs.putAt(props.x, props.y, 0)
    data.lastestX = roundFun(props.x)
    data.lastestY = roundFun(props.y)
    data.lastestScale = roundFun(props.scaleValue)
    data.minScrollX = bs.minScrollX
    data.maxScrollX = bs.maxScrollX
    data.minScrollY = bs.minScrollY
    data.maxScrollY = bs.maxScrollY
    scrollerHooks.on('beforeScrollStart', () => {
      data.source = 'touch'
    })
    scrollerHooks.on('scroll', (position: any) => {
      if (position.x > data.minScrollX && bs.movingDirectionX === -1 ||
        (position.x < data.maxScrollX && bs.movingDirectionX === 1) ||
        (position.y > data.minScrollY && bs.movingDirectionY === -1) ||
        (position.y < data.maxScrollY && bs.movingDirectionY === 1)) {
        data.source = 'touch-out-of-bounds'
      }
      if (props.direction !== 'none' && (data.directions.indexOf(props.direction) >= 0)) {
        if (data.isZooming || (roundFun(position.x) === data.lastestX && roundFun(position.y) === data.lastestY)) {
          return
        }
        props.onChange && props.onChange({
          x: roundFun(position.x) ? roundFun(position.x) : 0,
          y: roundFun(position.y) ? roundFun(position.y) : 0,
          source: data.source
        })
      }
      data.lastestX = roundFun(position.x)
      data.lastestY = roundFun(position.y)
    })
    scrollerHooks.on('touchEnd', (position: any) => {
      data.isFirstTouch = true
      if (position.x > data.minScrollX || position.x < data.maxScrollX ||
        position.y > data.minScrollY || position.y < data.maxScrollY
      ) {
        data.source = 'out-of-bounds'
      }
      if (position.x > data.minScrollX) {
        bs.movingDirectionX = 1
      }
      if (position.x < data.maxScrollX) {
        bs.movingDirectionX = -1
      }
      if (position.y > data.minScrollY) {
        bs.movingDirectionY = 1
      }
      if (position.y < data.maxScrollY) {
        bs.movingDirectionY = -1
      }
    })
    actionsHandlerHooks.on('move', (pos: any) => {
      const { deltaX, deltaY, e } = pos
      if (data.isZooming) {
        return
      }
      if (data.isFirstTouch) {
        if (Math.abs(deltaX) -  Math.abs(deltaY) > 0) {
          props.onHtouchmove && props.onHtouchmove()
        } else {
          props.onVtouchmove && props.onVtouchmove()
        }
      }
      data.isFirstTouch = false
    })
    if (props.inertia) { // movable-view是否带有惯性
      BehaviorHooks.on('momentum', () => {
        data.source = 'friction'
      })
    }
    if (props.scale) { // 支持双指缩放
      bs.on('zooming', (arg: any) => {
        const { scale } = arg
        if (data.lastestScale === roundFun(scale)) {
          return
        }
        data.isZooming = true
        props.onScale && props.onScale({
          x: roundFun(bs.x),
          y: roundFun(bs.y),
          scale: roundFun(scale)
        })
        data.lastestScale = roundFun(scale)
      })
      bs.on('zoomEnd', (arg: any) => {
        const { scale } = arg
        data.isZooming = false
      })
    }
    if (props.disabled) { // 禁用
      bs.disable()
    }
  }
  const initOptions = () => {
    if (movableArea?.scaleArea) {
      bsOptions = {
        ...bsOptions,
        bindToTarget: !props.scale
      }
    }
    if (props.scale) {
      bsOptions = {
        ...bsOptions,
        zoom:  { // for zoom plugin
          start: props.scaleValue,
          min: props.scaleMin < 0.5 ? 0.5 : props.scaleMin,
          max: props.scaleMax > 10 ? 10 : props.scaleMax
        }
      }
    }
    if (props.inertia) {
      bsOptions = {
        ...bsOptions,
        momentum: true,
        momentumLimitDistance: 30,
        deceleration: friction.value / 2 * 0.05,
        swipeTime: 50
      }
    }
    if (props.direction === 'vertical') {
      bsOptions = {
        ...bsOptions,
        scrollY: true
      }
    }
    if (props.direction === 'horizontal') {
      bsOptions = {
        ...bsOptions,
        scrollX: true
      }
    }
    if (props.direction === 'all') {
      bsOptions = {
        ...bsOptions,
        freeScroll: true,
        scrollX: true,
        scrollY: true
      }
    }
  }
  // 处理小数点，四舍五入，默认保留一位小数
  const roundFun = (value: number, n = 1) => {
    return Math.round(value * Math.pow(10, n)) / Math.pow(10, n)
  }

  watch(() => props.x, (newVal) => {
    data.source = ''
    if (newVal > bs.minScrollX) {
      newVal = bs.minScrollX
    }
    if (newVal < bs.maxScrollX) {
      newVal = bs.maxScrollX
    }
    bs.scrollTo(newVal, bs.y)
  })
  watch(() => props.y, (newVal) => {
    data.source = ''
    if (newVal > bs.minScrollY) {
      newVal = bs.minScrollY
    }
    if (newVal < bs.maxScrollY) {
      newVal = bs.maxScrollY
    }
    bs.scrollTo(bs.x, newVal)
  })
  watch(() => props.scaleValue, (newVal) => {
    data.isZooming = true
    if (newVal > 10) {
      newVal = 10
    }
    if (newVal < 0.5) {
      newVal = 0.5
    }
    bs.zoomTo(newVal, 'center', 'center')
  })

  onMounted(() => {
    nextTick(init)
  })
  onUnmounted(() => {
    bs && bs.destroy()
    ;(bs as any) = null
  })

  return {
    setEleRef,
    contentClass
  }
})

UniMovableView.render = function (_, state, { renders }) {
  const { rootClass, setEleRef, contentClass } = state
  return (
    <div class={rootClass} ref={setEleRef}>
      <div class={contentClass}>
        { renders.defaultRender && renders.defaultRender() }
      </div>
    </div>
  )
}

export const MovableView = uni2Platform(UniMovableView)
