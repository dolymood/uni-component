import {
  h,
  uniComponent,
  uni2Platform,
  useRef,
  PropType,
  onMounted,
  onUnmounted,
  classNames,
  provide
} from '@uni-component/core'
import { ref, watch, computed, Ref } from '@uni-store/core'
// import { processSize } from '../_/util'
import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'

BScroll.use(Slide)

export interface SwiperProvide {
  itemIds: Ref<string[]>
}
export const swiperProvide = 'swiperProvide'

type Source = 'touch' | ''

const UniSwiper = uniComponent('uni-swiper', {
  indicatorDots: Boolean,
  indicatorColor: {
    type: String,
    default: 'rgba(0, 0, 0, .3)'
  },
  indicatorActiveColor: {
    type: String,
    default: '#000000'
  },
  autoplay: Boolean,
  current: {
    type: Number,
    default: 0
  },
  interval: {
    type: Number,
    default: 5000
  },
  duration: {
    type: Number,
    default: 500
  },
  circular: Boolean,
  vertical: Boolean,
  // todo
  // previousMargin: {
  //   type: String,
  //   default: '0px'
  // },
  // nextMargin: {
  //   type: String,
  //   default: '0px'
  // },
  // snapToEdge: Boolean,
  // displayMultipleItems: {
  //   type: Number,
  //   default: 1
  // },
  easingFunction: {
    type: String as PropType<'default' | 'linear' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic'>,
    default: 'default'
  },
  onChange: Function as PropType<(detail: {current: number, currentItemId: string, source: Source}) => void>,
  onAnimationFinish: Function as PropType<(detail: {current: number, currentItemId: string, source: Source}) => void>,
  onTransition: Function as PropType<(detail: {dx: number, dy: number}) => void>
}, (name, props) => {
  const wrapper = ref<HTMLDivElement>()
  const setWrapperRef = useRef(wrapper)

  let bs: BScroll | null = null
  let lastX: number
  let lastY: number
  let changeSource: Source
  const currentIndex = ref(props.current)
  watch(() => props.current, (val) => {
    if (bs) {
      lastX = bs.x
      lastY = bs.y
    }
    changeSource = ''
    gotoIndex(val)
  })

  const contentClass = computed(() => {
    return classNames([
      `${name}-content`,
      {
        vertical: props.vertical
      }
    ])
  })

  const gotoIndex = (index: number) => {
    const x = props.vertical ? 0 : index
    const y = props.vertical ? index : 0
    bs && bs.goToPage(x, y)
  }

  const easing = computed(() => {
    switch (props.easingFunction) {
      case 'linear':
        return {
          style: 'linear',
          fn (t: number) {
            return t
          }
        }
      case 'easeInCubic':
        return {
          style: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
          fn (t: number) {
            return Math.pow(t, 3)
          }
        }
      case 'easeOutCubic':
        return {
          style: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          fn (t: number) {
            return (Math.pow((t - 1), 3) + 1)
          }
        }
      case 'easeInOutCubic':
        return {
          style: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
          fn (t: number) {
            if ((t /= 0.5) < 1) return 0.5 * Math.pow(t, 3)
            return 0.5 * (Math.pow((t - 2), 3) + 2)
          }
        }
      default:
        return
    }
  })

  const itemIds = ref<string[]>([])
  provide(swiperProvide, {
    itemIds
  })

  // const preMargin = processSize(props.previousMargin)
  // const nextMargin = processSize(props.nextMargin)

  onMounted(() => {
    const vertical = props.vertical
    const bscroll = new BScroll(wrapper.value!, {
      scrollX: !vertical,
      scrollY: vertical,
      slide: {
        loop: props.circular,
        threshold: 0.5,
        speed: props.duration,
        easing: easing.value,
        interval: props.interval,
        autoplay: props.autoplay
      },
      momentum: false,
      bounce: false,
      probeType: 3,
      stopPropagation: true
    })
    bs = bscroll

    bscroll.on('slideWillChange', (page: { pageX: number, pageY: number }) => {
      currentIndex.value = vertical ? page.pageY : page.pageX
      props.onChange && props.onChange({
        current: currentIndex.value,
        currentItemId: itemIds.value[currentIndex.value] || '',
        source: changeSource
      })
    })

    bscroll.on('scrollEnd', () => {
      props.onAnimationFinish && props.onAnimationFinish({
        current: currentIndex.value,
        currentItemId: itemIds.value[currentIndex.value] || '',
        source: changeSource
      })
    })
    bscroll.on('scroll', ({ x, y }: { x: number, y: number }) => {
      props.onTransition && props.onTransition({
        dx: lastX - x,
        dy: lastY - y
      })
    })

    bscroll.on('beforeScrollStart', () => {
      lastX = bscroll.x
      lastY = bscroll.y
      changeSource = 'touch'
    })
  })
  onUnmounted(() => {
    bs && bs.destroy()
    bs = null
  })

  return {
    setWrapperRef,
    contentClass,
    itemIds,
    currentIndex
  }
})

UniSwiper.render = function (props, state, { renders }) {
  const { indicatorDots, indicatorActiveColor, indicatorColor, vertical } = props
  const { rootClass, setWrapperRef, contentClass, itemIds, currentIndex } = state

  let dots
  if (indicatorDots) {
    let cls = 'uni-swiper-dots'
    if (vertical) {
      cls += ' vertical'
    }
    dots = (
      <div class={cls}>
        {
          itemIds.map((id, i) => {
            const style = {
              backgroundColor: i === currentIndex ? indicatorActiveColor : indicatorColor
            }
            return (
              <span class='uni-swiper-dots-item' style={style} key={id}></span>
            )
          })
        }
      </div>
    )
  }
  return (
    <div class={rootClass} ref={setWrapperRef}>
      <div class={contentClass}>
        {renders.defaultRender && renders.defaultRender()}
      </div>
      {dots}
    </div>
  )
}

export const Swiper = uni2Platform(UniSwiper)
