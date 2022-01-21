import {
  h,
  uniComponent,
  inject,
  onMounted,
  onUnmounted,
  useRef,
  uni2Platform
} from '@uni-component/core'
import { ref, nextTick } from '@uni-store/core'
import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'
import { PickerViewProvide, PickerViewColumnInstance, pickerViewProvide } from './picker-view'

BScroll.use(Wheel)

const UniPickerViewColumn = uniComponent('uni-picker-view-column', {}, (name, props) => {
  const ele = ref<HTMLDivElement>()
  const setEleRef = useRef(ele)

  const pickerView = inject<PickerViewProvide>(pickerViewProvide)

  let wheels: BScroll[] = []
  const selectedIndex = ref(0)

  const wheelTo = (val: number) => {
    if (wheels[0]) {
      // make sure the dom rendering is complete
      nextTick(() => {
        wheels[0].refresh()
        wheels[0].wheelTo(val)
      })
    }
  }

  let refreshing = false
  const refresh = () => {
    if (refreshing) return
    refreshing = true
    nextTick(() => {
      const wheelWrapper = ele.value!
      if (wheels[0]) {
        wheels[0].refresh()
        return
      }
      wheels[0] = new BScroll(wheelWrapper, {
        wheel: {
          selectedIndex: selectedIndex.value,
          rotate: -5,
          wheelWrapperClass: 'wheel-scroll'
        },
        probeType: 3
      })
      wheels[0].on('scrollStart', () => {
        if (pickerView) {
          pickerView.onPickStart()
        }
      })
      wheels[0].on('scrollEnd', () => {
        if (refreshing) return
        selectedIndex.value = wheels[0].getSelectedIndex()
        if (pickerView) {
          pickerView.onChange()
          pickerView.onPickEnd()
        }
      })
      refreshing = false
    })
  }

  let instance: PickerViewColumnInstance = {
    selectedIndex,
    wheelTo
  }
  pickerView?.children.push(instance)

  onMounted(() => {
    wheels = []
    refresh()
    const wheelScroll = ele.value!.children[0]
    const indicatorEleHeight = `${pickerView!.indicatorMaskEle.value.offsetHeight}px`
    for (let i = 0; i < wheelScroll.children.length; i++) {
      const el = wheelScroll.children[i] as HTMLElement
      el.style.height = indicatorEleHeight
    }
  })

  onUnmounted(() => {
    const index = pickerView?.children.indexOf(instance)
    pickerView?.children.splice(index!, 1)
    wheels.forEach((wheel) => {
      wheel.destroy()
    })
    wheels = []
    ;(instance as any) = null
  })

  return {
    setEleRef
  }
})

// for H5
// mini just use Mini components
UniPickerViewColumn.render = function (props, state, { renders }) {
  const { rootClass, setEleRef } = state
  return (
    // wheel-wrapper
    <div class={rootClass} ref={setEleRef}>
      <div class='wheel-scroll'>
        {renders.defaultRender && renders.defaultRender()}
      </div>
    </div>
  )
}

export const PickerViewColumn = uni2Platform(UniPickerViewColumn)
