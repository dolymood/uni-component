import {
  h,
  uniComponent,
  uni2Platform,
  PropType,
  onMounted,
  onUnmounted,
  useRef,
  classNames
} from '@uni-component/core'
import { ref, computed, watch, nextTick } from '@uni-store/core'
import BScroll from '@better-scroll/core'
import Wheel from '@better-scroll/wheel'
import { useTransition } from '../_/transition'

export type Mode = 'selector' | 'multiSelector' | 'time' | 'date'
export type Fields = 'day' | 'month' | 'year'
export type PickerValue = number | number[] | string

const startYear = 1970
const modeOptions: Record<string, number[]> = {
  time: [23, 59],
  date: [130, 11, 30]
}

BScroll.use(Wheel)

function getPickerData (range: any[], rangeKey?: string) {
  if (range) {
    return range.map((item) => {
      if (rangeKey && Object(item) === item) {
        return item[rangeKey]
      }
      return item
    })
  }
  return range
}

function getTimePickerData () {
  let list = []
  for (let i = 0; i < 60; i++) {
    let temp = i < 10 ? `0${i}` : i
    list.push(temp)
  }
  return [list.slice(0, 24), list]
}

function getDatePickerData (fields: Fields) {
  let years = []
  let months = []
  let days = []

  for (let i = 0; i <= 130; i++) {
    years.push(`${startYear + i}年`)
  }
  if (fields === 'year') {
    return [years]
  }

  for (let i = 1; i <= 12; i++) {
    let temp = i < 10 ? `0${i}` : i
    months.push(`${temp}月`)
  }
  if (fields === 'month') {
    return [years, months]
  }

  for (let i = 1; i <= 31; i++) {
    let temp = i < 10 ? `0${i}` : i
    days.push(`${temp}日`)
  }
  return [years, months, days]
}

export const UniPicker = uniComponent('uni-picker', {
  mode: {
    type: String as PropType<Mode>,
    default: 'selector'
  },
  disabled: Boolean,
  range: {
    type: Array,
    default () {
      return []
    }
  },
  rangeKey: String,
  value: [Number, String, Array],
  start: String,
  end: String,
  fields: {
    type: String as PropType<Fields>,
    default: 'day'
  },
  onChange: Function,
  onColumnChange: Function,
  onCancel: Function
}, (name, props) => {
  const wrapper = ref<HTMLDivElement>()
  const setWrapperRef = useRef(wrapper)

  const propValue = computed(() => {
    const val = props.value
    const mode = props.mode
    if (val !== undefined) {
      return val
    }
    switch (mode) {
      case 'selector':
        return 0
      case 'multiSelector':
        return []
      case 'time':
        return ''
      case 'date':
        return ''
      default:
        return ''
    }
  })

  const pickerData = computed(() => {
    switch (props.mode) {
      case 'selector':
        return [getPickerData(props.range, props.rangeKey)]
      case 'multiSelector':
        return props.range.map((item: any) => {
          return getPickerData(item, props.rangeKey)
        })
      case 'time':
        return getTimePickerData()
      case 'date':
        return getDatePickerData(props.fields)
      default:
        return []
    }
  })

  const isShow = ref(false)
  let startIndex = [0, 0, 0]
  let endIndex = [0, 0, 0]
  let itemHeight = 0
  let selectedIndex: any[] = []
  let wheels: BScroll[]
  let needRefresh = false
  let refreshing = false

  const isMoving = () => {
    return wheels.some((wheel) => {
      return wheel.pending
    })
  }
  const confirm = () => {
    if (isMoving()) {
      return
    }
    hide()
    let value: any = ''
    let valueTemp = []
    switch (props.mode) {
      case 'selector':
        value = selectedIndex[0]
        break
      case 'multiSelector':
        value = selectedIndex.slice()
        break
      case 'time':
        for (let i = 0; i < selectedIndex.length; i++) {
          valueTemp[i] = selectedIndex[i] < 10 ? `0${Number(selectedIndex[i])}` : `${selectedIndex[i]}`
        }
        value = `${valueTemp[0]}:${valueTemp[1]}`
        break
      case 'date':
        let year = pickerData.value[0][selectedIndex[0]].replace('年', '')
        if (props.fields === 'year') {
          value = `${year}`
          break
        }

        let month = selectedIndex[1] < 9 ? `0${selectedIndex[1] + 1}` : selectedIndex[1] + 1
        if (props.fields === 'month') {
          value = `${year}-${month}`
          break
        }

        let day = selectedIndex[2] < 9 ? `0${selectedIndex[2] + 1}` : selectedIndex[2] + 1
        value = `${year}-${month}-${day}`
        break
      default:
        value = selectedIndex[0]
    }
    props.onChange && props.onChange({
      value
    })
  }
  const cancel = () => {
    hide()
    props.onCancel && props.onCancel()
  }
  const show = () => {
    isShow.value = true
    if (needRefresh) {
      needRefresh = false
      refresh()
    }
  }
  const hide = () => {
    isShow.value = false
  }
  const refresh = () => {
    if (isShow.value) {
      if (refreshing) return
      refreshing = true
      // wait transition
      nextTick(() => {
        nextTick(() => {
          let i = 0
          const wheelWrapper = wrapper.value
          const _pickerData = pickerData.value
          for (; i < _pickerData.length; i++) {
            selectedIndex[i] = +selectedIndex[i] || 0
            if (selectedIndex[i] >= _pickerData[i].length) {
              selectedIndex[i] = 0
            }
            if (wheels[i]) {
              wheels[i].refresh()
              if (wheels[i].getSelectedIndex() !== selectedIndex[i]) {
                wheels[i].wheelTo(selectedIndex[i])
              }
            } else {
              wheels[i] = new BScroll(wheelWrapper!.children[i] as HTMLElement, {
                wheel: {
                  selectedIndex: selectedIndex[i],
                  wheelWrapperClass: 'wheel-scroll',
                  wheelItemClass: 'wheel-item'
                },
                probeType: 3
              })
              if (props.mode === 'time' || props.mode === 'date') {
                wheels[i].on('scrollStart', () => {
                  handleScrollStart()
                })
              }
              const curIndex = i
              wheels[i].on('scrollEnd', () => {
                if (refreshing) return
                const currentIndex = wheels[curIndex].getSelectedIndex()
                if (selectedIndex[curIndex] !== currentIndex) {
                  selectedIndex[curIndex] = currentIndex
                  if (props.mode === 'multiSelector') {
                    props.onColumnChange && props.onColumnChange({
                      column: curIndex,
                      value: currentIndex
                    })
                  }
                }
                if (props.mode === 'time' || props.mode === 'date') {
                  handleScrollEnd()
                }
              })
            }
          }
          if (props.mode === 'time' || props.mode === 'date') {
            initWheelPosition()
          }
          for (; i < wheels.length; i++) {
            if (wheels[i]) {
              wheels[i].destroy()
            }
          }
          wheels.length = _pickerData.length
          selectedIndex.length = _pickerData.length
          refreshing = false
        })
      })
    } else {
      needRefresh = true
    }
  }
  const initRangeIndex = () => {
    if (props.mode !== 'time' && props.mode !== 'date') {
      return
    }

    itemHeight = +window.getComputedStyle(document.getElementsByClassName('wheel-item')[0]).height.replace(/px/g, '')
    if (props.mode === 'time') {
      startIndex = [getIndex('start', 0, ':'), getIndex('start', 1, ':')]
      endIndex = [getIndex('end', 0, ':'), getIndex('end', 1, ':')]
    }
    if (props.mode === 'date') {
      startIndex = [getIndex('start', 0, '-') - startYear, getIndex('start', 1, '-') - 1, getIndex('start', 2, '-') - 1]
      endIndex = [getIndex('end', 0, '-') - startYear, getIndex('end', 1, '-') - 1, getIndex('end', 2, '-') - 1]
    }
  }
  const getIndex = (type: 'start' | 'end', i: number, delimiter: string) => {
    return (props[type] && Number(props[type]!.split(delimiter)[i])) as number
  }
  const handleScrollStart = () => {
    // 重置可滚动距离
    for (let i = 0; i < wheels.length; i++) {
      wheels[i].minScrollY = 0
      wheels[i].maxScrollY = -(modeOptions[props.mode][i] * itemHeight)
    }
    // 开始滚动 判断最多可滚动距离
    if (props.start) {
      wheels[0].minScrollY = -(startIndex[0] * itemHeight)

      for (let i = 0; i < wheels.length; i++) {
        if (!(wheels[i + 1] && wheels[i].getSelectedIndex() === startIndex[i])) {
          break
        }
        wheels[i + 1].minScrollY = -(startIndex[i + 1] * itemHeight)
        wheels[i + 1].maxScrollY = -(modeOptions[props.mode][i + 1] * itemHeight)
      }
    }
    if (props.end) {
      wheels[0].maxScrollY = -(endIndex[0] * itemHeight)

      for (let i = 0; i < wheels.length; i++) {
        if (!(wheels[i + 1] && wheels[i].getSelectedIndex() === endIndex[i])) {
          break
        }
        wheels[i + 1].minScrollY = 0
        wheels[i + 1].maxScrollY = -(endIndex[i + 1] * itemHeight)
      }
    }
  }
  const handleScrollEnd = () => {
    const solarMonths = [1, 3, 5, 7, 8, 10, 12]
    if (props.start) {
      for (let i = 0; i < wheels.length; i++) {
        if (!(wheels[i].getSelectedIndex() === startIndex[i]) || !(wheels[i + 1])) {
          break
        }
        if (wheels[i + 1].getSelectedIndex() < startIndex[i + 1]) {
          wheels[i + 1].minScrollY = 0
          wheels[i + 1].maxScrollY = -(modeOptions[props.mode][i+1] * itemHeight)
          wheels[i + 1].wheelTo([startIndex[i + 1]])
        }
      }
    }
    if (props.end) {
      for (let i = 0; i < wheels.length; i++) {
        if (!(wheels[i].getSelectedIndex() === endIndex[i]) || !(wheels[i + 1])) {
          break
        }
        if (wheels[i + 1].getSelectedIndex() > endIndex[i + 1]) {
          wheels[i + 1].minScrollY = 0
          wheels[i + 1].maxScrollY = -(modeOptions[props.mode][i+1] * itemHeight)
          wheels[i + 1].wheelTo([endIndex[i + 1]])
        }
      }
    }
    // 单独处理小月30天，2月28天或29天情况
    if (props.mode === 'date' && props.fields === 'day' && !solarMonths.includes(wheels[1].getSelectedIndex() + 1)) {
      const currentYear = wheels[0].getSelectedIndex() + startYear
      const isFebruary = wheels[1].getSelectedIndex() === 1
      const isLeapYear = (currentYear % 4 === 0 && (currentYear % 100 !== 0)) || (currentYear % 400 === 0)
      const day = isFebruary && (isLeapYear ? 28 : 27) || 29
      wheels[2].getSelectedIndex() > day && wheels[2].wheelTo([day])
    }
  }
  const initWheelPosition = () => {
    if (props.start) {
      if (wheels[0].getSelectedIndex() < startIndex[0]) {
        for (let i = 0; i < wheels.length; i++) {
          wheels[i].wheelTo([startIndex[i]])
          selectedIndex[i] = startIndex[i] || 0
        }
      } else {
        for (let i = 0; i < wheels.length; i++) {
          if (wheels[i].getSelectedIndex() !== startIndex[i]) {
            break
          }
          if (wheels[i+1] && wheels[i+1].getSelectedIndex() < startIndex[i+1]) {
            for (let j = i+1; j < wheels.length; j++) {
              wheels[j].wheelTo([startIndex[j]])
              selectedIndex[j] = startIndex[j] || 0
            }
          }
        }
      }
    }
    if (props.end) {
      if (wheels[0].getSelectedIndex() > endIndex[0]) {
        for (let i = 0; i < wheels.length; i++) {
          wheels[i].wheelTo([endIndex[i]])
          selectedIndex[i] = endIndex[i] || 0
        }
      } else {
        for (let i = 0; i < wheels.length; i++) {
          if (wheels[i].getSelectedIndex() !== endIndex[i]) {
            break
          }
          if (wheels[i+1] && wheels[i+1].getSelectedIndex() > endIndex[i+1]) {
            for (let j = i+1; j < wheels.length; j++) {
              wheels[j].wheelTo([endIndex[j]])
              selectedIndex[j] = endIndex[j] || 0
            }
          }
        }
      }
    }
  }
  watch(() => pickerData.value, refresh)
  watch(() => propValue.value, (value: any) => {
    let valueTemp: any[] = []
    switch (props.mode) {
      case 'selector':
        selectedIndex = [value]
        break
      case 'multiSelector':
        selectedIndex = []
        const range = props.range
        for (let i = 0; i < range.length; i++) {
          selectedIndex[i] = value[i] || 0
        }
        break
      case 'time':
        selectedIndex = []
        if (!value)  {
          valueTemp = [new Date().getHours(), new Date().getMinutes()]
        } else {
          valueTemp = value && value.split(':')
        }
        for (let i = 0; i < valueTemp.length; i++) {
          selectedIndex[i] = valueTemp[i] || 0
        }
        break
      case 'date':
        selectedIndex = []
        if (!value)  {
          valueTemp = [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()]
        } else {
          valueTemp = value && value.split('-')
        }
        let result = Object.keys(pickerData.value[0]).filter(item => startYear + Number(item) === Number(valueTemp[0]))
        selectedIndex[0] = Number(result[0])
        for (let i = 1; i < valueTemp.length; i++) {
          selectedIndex[i] = valueTemp[i] - 1
        }
        break
      default:
        selectedIndex = [0]
    }
    refresh()
  }, {
    immediate: true
  })

  onMounted(() => {
    wheels = []
    refresh()
    initRangeIndex()
  })
  onUnmounted(() => {
    wheels.forEach((wheel) => {
      wheel.destroy()
    })
    wheels = []
  })

  // transition
  const fadeTransition = useTransition(isShow, `${name}-fade`)
  const moveTransition = useTransition(isShow, `${name}-move`)
  const mainClass = computed(() => {
    return classNames([
      `${name}-main`,
      fadeTransition.transtionClass.value
    ])
  })
  const panelClass = computed(() => {
    return classNames([
      `${name}-panel`,
      moveTransition.transtionClass.value
    ])
  })

  return {
    isShow,
    pickerData,
    setWrapperRef,
    show,
    hide,
    confirm,
    cancel,
    fadeTransition,
    moveTransition,
    mainClass,
    panelClass
  }
})

UniPicker.render = function (_, state, { slots }) {
  const {
    rootClass,
    pickerData,
    setWrapperRef,
    show,
    confirm,
    cancel,
    fadeTransition,
    moveTransition,
    mainClass,
    panelClass
  } = state
  return (
    <div class={rootClass}>
      <div onClick={show}>
        {slots.default && slots.default()}
      </div>
      <div class={mainClass} style={fadeTransition.style} onTransitionEnd={fadeTransition.onTransitionEnd} onTouchMove={(e) => e.preventDefault()} onClick={cancel}>
        <div class={panelClass} style={moveTransition.style} onTransitionEnd={moveTransition.onTransitionEnd} onClick={(e) => e.stopPropagation()}>
          <div class='uni-picker-choose uni-picker-bb1'>
            <span class='cancel' onClick={cancel}>取消</span>
            <span class='confirm' onClick={confirm}>确定</span>
          </div>
          <div class='uni-picker-content'>
            <div class='mask-top uni-picker-bb1'></div>
            <div class='mask-bottom uni-picker-bt1'></div>
            <div class='wheel-wrapper' ref={setWrapperRef}>
              {
                pickerData.map((data, index) => {
                  return (
                    <div class='wheel' key={index}>
                      <ul class='wheel-scroll'>
                        {
                          data.map((item) => {
                            return (
                              <li class='wheel-item' key={item}>{item}</li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Picker = uni2Platform(UniPicker)
