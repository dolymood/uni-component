import { h, uniComponent, uni2Platform, onMounted, onUnmounted, onUpdated, PropType, useRef } from '@uni-component/core'
import { ref, computed, watch } from '@uni-store/core'
import { processSize } from '../_/util'
import BScroll, { Options } from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import ObserveDom from '@better-scroll/observe-dom'

BScroll.use(ObserveDom)
BScroll.use(PullDown)

type RefresherStyle = 'black' | 'white' | 'none'

const UniScrollView = uniComponent('uni-scroll-view', {
  scrollX: Boolean,
  scrollY: Boolean,
  upperThreshold: {
    type: [Number, String],
    default: 50
  },
  lowerThreshold: {
    type: [Number, String],
    default: 50
  },
  scrollTop: {
    type: [Number, String],
    default: 0
  },
  scrollLeft: {
    type: [Number, String],
    default: 0
  },
  scrollIntoView: String,
  scrollWithAnimation: Boolean,
  enableFlex: Boolean,
  enhanced: Boolean,
  refresherEnabled: Boolean,
  refresherTriggered: Boolean,
  refresherThreshold: {
    type: Number,
    default: 45
  },
  refresherDefaultStyle: {
    type: String as PropType<RefresherStyle>,
    default: 'black'
  },
  refresherBackground: String,
  // bs web
  scrollOptions: Object,
  updateRefresh: {
    type: Boolean,
    default: true
  },
  onDragStart: Function,
  onDragging: Function,
  onDragEnd: Function,
  onScrollToUpper: Function,
  onScrollToLower: Function,
  onScroll: Function,
  onRefresherPulling: Function,
  onRefresherRefresh: Function,
  onRefresherRestore: Function,
  onRefresherAbort	: Function
}, (_, props) => {
  const wrapper = ref<HTMLDivElement>()
  const setWrapperRef = useRef(wrapper)
  const innerWrapper = ref<HTMLDivElement>()
  const setInnerWrapperRef = useRef(innerWrapper)

  const scrollTop = computed(() => {
    return processSize(props.scrollTop)
  })
  watch(() => scrollTop.value, (val) => {
    bs && bs.scrollTo(bs.x, -val, props.scrollWithAnimation ? 200 : 0)
  })

  const scrollLeft = computed(() => {
    return processSize(props.scrollLeft)
  })
  watch(() => scrollLeft.value, (val) => {
    bs && bs.scrollTo(-val, bs.y, props.scrollWithAnimation ? 200 : 0)
  })

  const lowerThreshold = computed(() => {
    return processSize(props.lowerThreshold)
  })
  const upperThreshold = computed(() => {
    return processSize(props.upperThreshold)
  })

  const isLoading = ref(false)
  let isAutoPullDown = true

  const pullDownWrapperStyle = computed(() => {
    return {
      background: props.refresherBackground
    }
  })
  const pullDownContentClassName = computed(() => {
    let className = 'uni-pull-down-content'
    if (props.refresherDefaultStyle === 'black') {
      className += ' uni-pull-down-content-black'
    } else if (props.refresherDefaultStyle === 'white') {
      className += ' uni-pull-down-content-white'
    }
    if (isLoading.value) {
      className += ' active'
    }
    return className
  })
  watch(() => props.refresherTriggered, (val) => {
    if (!val) {
      props.onRefresherRestore && props.onRefresherRestore()
      isLoading.value = false
      isAutoPullDown = true
      bs && bs.finishPullDown()
      bs && bs.refresh()
    } else {
      if (isAutoPullDown) {
        isLoading.value = true
        bs && bs.autoPullDownRefresh()
      }
    }
  })

  let bs: BScroll | null  = null

  watch(() => props.scrollIntoView, (val) => {
    bs && bs.scrollToElement('#' + val, props.scrollWithAnimation ? 200 : 0, true, true)
  })

  const destroy = () => {
    if (!bs) return
    bs.destroy()
    bs = null
  }

  let lastX: number
  let lastY: number
  const init = () => {
    if (bs) return
    initLayerComputed()
    const originBsOptions: Options = {
      // useTransition: false,
      startX: -scrollLeft.value,
      startY: -scrollTop.value,
      scrollX: props.scrollX,
      scrollY: props.scrollY,
      probeType: 3,
      bounce: false,
      stopPropagation: true,
      bindToWrapper: true,
      eventPassthrough: (props.scrollX && 'vertical') || (props.scrollY && 'horizontal') || ''
    }
    if (props.refresherEnabled) {
      originBsOptions.bounce = true
      originBsOptions.pullDownRefresh = {
        threshold: props.refresherThreshold,
        stop: 56
      }
    }
    const bsOptions = Object.assign({}, originBsOptions, props.scrollOptions)
    const bscroll = new BScroll(wrapper.value!, bsOptions)
    bs = bscroll
    bscroll.scroller.hooks.on('beforeRefresh', initLayerComputed)
    lastX = -scrollLeft.value
    lastY = -scrollTop.value
    bscroll.on('scroll', ({ x, y }: { x: number, y: number }) => {
      const deltaX = x - lastX
      const deltaY = y - lastY
      props.onScroll && props.onScroll({
        scrollLeft: -x,
        scrollTop: -y,
        scrollWidth: bscroll.scrollerWidth,
        scrollHeight: bscroll.scrollerHeight,
        deltaX,
        deltaY
      })
      if (bscroll.minScrollX - x < upperThreshold.value && deltaX > 0) {
        dispatchScrollTo('left')
      }
      if (bscroll.minScrollY - y < upperThreshold.value && deltaY > 0) {
        dispatchScrollTo('top')
      }
      if (x - bscroll.maxScrollX < lowerThreshold.value && deltaX < 0) {
        dispatchScrollTo('right')
      }
      if (y - bscroll.maxScrollY < lowerThreshold.value && deltaY < 0) {
        dispatchScrollTo('bottom')
      }
      lastX = x
      lastY = y
    })
    if (props.scrollIntoView) {
      bs.scrollToElement('#' + props.scrollIntoView, 0, true, true)
    }
    // 若开启自定义下拉刷新 或 开启 scroll-view 增强特性
    if (props.refresherEnabled || props.enhanced) {
      const actionsHandlerHooks = bscroll.scroller.actionsHandler.hooks
      actionsHandlerHooks.on('start', () => {
        if (props.enhanced) {
          props.onDragStart && props.onDragStart({
            scrollLeft: bscroll.x ? bscroll.x * -1 : 0,
            scrollTop: bscroll.y ? bscroll.y * -1 : 0
          })
        }
        if (props.refresherEnabled) {
          isAutoPullDown = false
        }
      })
      actionsHandlerHooks.on('move', () => {
        if (props.enhanced) {
          props.onDragging && props.onDragging({
            scrollLeft: bscroll.x ? bscroll.x * -1 : 0,
            scrollTop: bscroll.y ? bscroll.y * -1 : 0
          })
        }
        if (props.refresherEnabled) {
          if (bscroll.y > 0 && bscroll.y < props.refresherThreshold && bscroll.movingDirectionY !== 1) {
            isAutoPullDown = false
            isLoading.value = false
            props.onRefresherPulling && props.onRefresherPulling()
          }
        }
      })
      actionsHandlerHooks.on('end', () => {
        if (props.enhanced) {
          props.onDragEnd && props.onDragEnd({
            scrollLeft: bscroll.x ? bscroll.x * -1 : 0,
            scrollTop: bscroll.y ? bscroll.y * -1 : 0
          })
        }
      })
      if (props.refresherEnabled) {
        // 下拉结束其他钩子都被bs阻止了，只有touchEnd可以触发
        bscroll.scroller.hooks.on('touchEnd', () => {
          if (bscroll.y > 0 && bscroll.movingDirectionY !== 1) {
            isLoading.value = true
            if (bscroll.y < props.refresherThreshold) {
              isAutoPullDown = true
              props.onRefresherAbort && props.onRefresherAbort()
            }
          }
        })
        bscroll.on('pullingDown', () => {
          props.onRefresherRefresh && props.onRefresherRefresh()
        })
      }
    }
  }
  const initLayerComputed = () => {
    const _wrapper = wrapper.value!
    const wrapperWidth = _wrapper.offsetWidth
    const wrapperHeight = _wrapper.offsetHeight
    const _innerWrapper = innerWrapper.value!
    _innerWrapper.style.width = `${wrapperWidth}px`
    _innerWrapper.style.height = `${wrapperHeight}px`
    const childrenArr = Array.from(_innerWrapper.children)

    const getMinLength = (min?: number, value?: number) => {
      if (min === undefined) {
        min = value
      } else {
        min = min > value! ? value : min
      }
      return min
    }

    const getMaxLength = (max?: number, value?: number) => {
      if (max === undefined) {
        max = value
      } else {
        max = max < value! ? value : max
      }
      return max
    }

    let minLeft: number
    let maxRight: number
    let minTop: number
    let maxBottom: number

    childrenArr.forEach(item => {
      const temp = item.getBoundingClientRect()
      minLeft = getMinLength(minLeft, temp.left)!
      minTop = getMinLength(minTop, temp.top)!
      maxRight = getMaxLength(maxRight, temp.right)!
      maxBottom = getMaxLength(maxBottom, temp.bottom)!
    })

    const width = maxRight! - minLeft!
    const height = maxBottom! - minTop!
    const scrollContent = wrapper.value!.children[0] as HTMLElement
    scrollContent.style.width = `${width}px`
    scrollContent.style.height = `${height}px`
  }
  const refresh = () => {
    bs && bs.refresh()
  }
  // todo throttle
  const dispatchScrollTo = (direction: 'top' | 'right' | 'bottom' | 'left') => {
    if (direction === 'bottom' || direction === 'right') {
      props.onScrollToLower && props.onScrollToLower({
        direction
      })
    } else {
      props.onScrollToUpper && props.onScrollToUpper({
        direction
      })
    }
  }

  onMounted(() => {
    init()
  })
  onUpdated(() => {
    if (props.updateRefresh) refresh()
  })
  onUnmounted(() => {
    destroy()
  })

  return {
    setWrapperRef,
    setInnerWrapperRef,
    pullDownWrapperStyle,
    pullDownContentClassName
  }
})

UniScrollView.render = function (props, state, { slots }) {
  const { refresherEnabled, refresherDefaultStyle } = props
  const {
    rootClass,
    setWrapperRef,
    setInnerWrapperRef,
    pullDownWrapperStyle,
    pullDownContentClassName
  } = state

  const pullDownContent = refresherDefaultStyle !== 'none' ? (
    <div class={pullDownContentClassName}>
      <div class='circle circle-a'></div>
      <div class='circle circle-b'></div>
      <div class='circle circle-c'></div>
    </div>
  ) : undefined

  const pullDownWrapper = refresherEnabled ? (
    <div class='uni-pull-down-wrapper' style={pullDownWrapperStyle}>
      {pullDownContent}
    </div>
  ): undefined

  return (
    <div class={rootClass} ref={setWrapperRef}>
      <div class='uni-scroll-view-content'>
        {pullDownWrapper}
        <div ref={setInnerWrapperRef}>
          {slots.default && slots.default()}
        </div>
      </div>
    </div>
  )
}

export const ScrollView = uni2Platform(UniScrollView)
