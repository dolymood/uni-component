import { h, uniComponent, uni2Platform, useRef } from '@uni-component/core'
import { watch, ref, computed } from '@uni-store/core'
import { useField, FieldType } from '../_/form/field'

const UniSlider = uniComponent('uni-slider', {
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  disabled: Boolean,
  value: {
    type: Number,
    default: 0
  },
  activeColor: {
    type: String,
    default: '#1aad19'
  },
  backgroundColor:{
    type: String,
    default: '#e9e9e9'
  },
  blockSize: {
    type: Number,
    default: 28
  },
  blockColor: {
    type: String,
    default: '#ffffff'
  },
  showValue: Boolean,
  name: String,
  onChange: Function,
  onChanging: Function
}, (_, props) => {
  const rootClass = 'weui-slider-box'

  const ele = ref<HTMLDivElement>()
  const setEleRef = useRef(ele)

  const value = ref(props.value)
  watch(() => props.value, (newVal) => {
    const { max, min } = props
    if (newVal !== null && newVal !== value.value) {
      const val = Math.max(min, Math.min(newVal, max))
      updateByStep(val)
    }
  })
  const { setFormValue } = useField(props.name || '', FieldType.slider)
  watch(() => value.value, (value) => {
    setFormValue(value)
  })

  let totalWidth = 0
  let touching = false
  let ogX = 0
  let touchId: number | null = null
  let percent = ref(0)
  let ogPercent: number

  const onTouchStart = (e: TouchEvent) => {
    if (touching || props.disabled) return

    touching = true
    touchId = e.targetTouches[0].identifier
    totalWidth = ele.value!.clientWidth
    ogX = e.targetTouches[0].pageX
    ogPercent = percent.value
  }

  const onTouchMove = (e: TouchEvent) => {
    const {
      disabled,
      max,
      min
    } = props
    if (!touching || disabled) return
    if (e.targetTouches[0].identifier !== touchId) return

    e.preventDefault()

    const pageX = e.targetTouches[0].pageX
    const diffX = pageX - ogX

    let percent = diffX / totalWidth * 100 + ogPercent
    percent = Math.max(0, Math.min(percent, 100))
    const val = min + percent * 0.01 * (max - min)

    updateByStep(val)

    props.onChanging && props.onChanging({
      detail: e.detail,
      value: value.value
    })
  }

  const onTouchEnd = (e: TouchEvent) => {
    const { disabled } = props
    if (!touching || disabled) return

    if (percent.value !== ogPercent) {
      props.onChange && props.onChange({
        detail: e.detail,
        value: value.value
      })
    }

    touching = false
    touchId = null
    ogX = 0
    ogPercent = 0
  }

  const updateByStep = (val: number) => {
    const { max, min, step } = props
    const steps = Math.floor((max - min) / step)
    for (let i = 0; i <= steps; i++) {
      const current = min + step * i
      const next = i === steps ? null : min + step * (i + 1)

      if (val === current) break

      if (!next && val > current) {
        // step 不能被 max - min 整除
        val = current
      }

      if (next && val > current && val < next) {
        if (val - current < step / 2) {
          val = current
        } else {
          val = next
        }
        break
      }
    }

    const _percent = (val - min) / (max - min) * 100

    value.value = val
    percent.value = _percent
  }

  const percentage = computed(() => percent.value > 100 ? 100 : percent.value)

  const handlerStyles = computed(() => {
    let blockSize = props.blockSize

    if (blockSize < 12) {
      blockSize = 12
    }
    if (blockSize > 28) {
      blockSize = 28
    }
    return {
      left: `${percentage.value}%`,
      width: `${blockSize}px`,
      height: `${blockSize}px`,
      backgroundColor: props.blockColor,
      marginTop: `-${Math.floor(blockSize / 2)}px`,
      marginLeft: `-${Math.floor(blockSize / 2)}px`
    }
  })
  const innerStyles = computed(() => {
    return { backgroundColor: props.backgroundColor }
  })
  const trackStyles = computed(() => {
    return {
      width: `${percentage.value}%`,
      backgroundColor: props.activeColor
    }
  })

  return {
    rootClass,
    setEleRef,
    value,
    handlerStyles,
    innerStyles,
    trackStyles,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
})

UniSlider.render = function (props, state) {
  const {
    showValue,
    name
  } = props
  const {
    rootClass,
    setEleRef,
    value,
    handlerStyles,
    innerStyles,
    trackStyles,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  } = state
  return (
    <div class={rootClass}>
      <div class='weui-slider'>
        <div class='weui-slider__inner' style={innerStyles} ref={setEleRef}>
          <div style={trackStyles} class='weui-slider__track' />
          <div
            class='weui-slider__handler'
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={handlerStyles}
          ></div>
          <input type='hidden' name={name} value={value} />
        </div>
      </div>
      {showValue && <div class='weui-slider-box__value'>{value}</div>}
    </div>
  )
}

export const Slider = uni2Platform(UniSlider)
