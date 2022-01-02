import {
  h,
  uniComponent,
  provide,
  useRef,
  classNames,
  onMounted,
  PropType,
  uni2Platform,
  inlineStyle2Obj
} from '@uni-component/core'
import { ref, computed, watch, ComputedRef, Ref } from '@uni-store/core'
import { useField, FieldType } from '../_/form/field'

export interface PickerViewColumnInstance {
  selectedIndex: Ref<number>,
  wheelTo: (val: number) => void
}

export interface PickerViewProvide {
  children: PickerViewColumnInstance[],
  value: ComputedRef<Array<number>>,
  indicatorMaskEle: Ref<HTMLDivElement>,
  onChange: () => void,
  onPickStart: () => void,
  onPickEnd: () => void
}
export const pickerViewProvide = 'pickerViewProvide'

export const UniPickerView = uniComponent('uni-picker-view', {
  name: String,
  value: Array as PropType<number[]>,
  indicatorStyle: String,
  indicatorClass: String,
  maskStyle: String,
  maskClass: String,
  onChange: Function as PropType<(detail: {value?: number[]}) => void>,
  onPickStart: Function as PropType<() => void>,
  onPickEnd: Function as PropType<() => void>
}, (_, props) => {
  const rootClass = computed(() => {
    return props.maskClass
  })

  const children: PickerViewColumnInstance[] = []

  const ele = ref<HTMLDivElement>()
  const setEleRef = useRef(ele)

  const indicatorMaskEle = ref<HTMLDivElement>()
  const setIndicatorMaskEleRef = useRef(indicatorMaskEle)

  const maskHeight = ref(0)

  const maskStyle = computed(() => {
    return inlineStyle2Obj(props.maskStyle)
  })
  const indicatorStyle = computed(() => {
    return inlineStyle2Obj(props.indicatorStyle)
  })

  const value = ref(props.value)
  const setValue = (val?: number[]) => {
    value.value = val
    children.forEach((child, index) => {
      child.selectedIndex.value = val![index]
    })
  }
  watch(() => props.value, setValue)

  const computedValue = () => {
    children.forEach((child, index) => {
      value.value![index] = child.selectedIndex.value
    })
  }

  const { setFormValue } = useField(props.name || '', FieldType.picker)
  watch(() => value.value, (value) => {
    setFormValue(value)
  })

  const onChange = () => {
    computedValue()
    props.onChange && props.onChange({
      value: value.value
    })
  }
  const onPickStart = () => {
    props.onPickStart && props.onPickStart()
  }
  const onPickEnd = () => {
    props.onPickEnd && props.onPickEnd()
  }
  provide(pickerViewProvide, {
    value,
    children,
    indicatorMaskEle,
    maskStyle,
    indicatorStyle,
    onChange,
    onPickStart,
    onPickEnd
  })

  onMounted(() => {
    let containerHeight = ele.value!.offsetHeight
    let indicatorMaskHeight = indicatorMaskEle.value!.offsetHeight
    maskHeight.value = (containerHeight - indicatorMaskHeight) / 2
    if (props.value) {
      setValue(props.value)
    } else {
      computedValue()
    }
  })

  return {
    rootClass,
    setEleRef,
    setIndicatorMaskEleRef,
    maskHeight,
    maskStyle,
    indicatorStyle
  }
})

// for H5
// mini just use Mini components
UniPickerView.render = function (props, state, { slots }) {
  const {
    indicatorClass
  } = props
  const {
    rootClass,
    setEleRef,
    setIndicatorMaskEleRef,
    maskHeight,
    maskStyle,
    indicatorStyle
  } = state
  const _maskStyle = {
    height: maskHeight + 'px'
  }
  const containerStyle = {
    paddingTop: maskHeight + 'px'
  }
  const _indicatorClass = classNames([
    'indicator-mask',
    'uni-picker-view-bb1',
    'uni-picker-view-bt1',
    indicatorClass
  ])
  return (
    <div class={rootClass} style={maskStyle} ref={setEleRef}>
      <div class='uni-picker-view-panel' onClick={(e) => e.stopPropagation()}>
        <div class='uni-picker-view-content'>
          <div class='mask-top' style={_maskStyle}></div>
          <div class="mask-bottom" style={_maskStyle}></div>
          <div class={_indicatorClass} style={indicatorStyle} ref={setIndicatorMaskEleRef}></div>
          <div class='uni-picker-view-container' style={containerStyle}>
            {slots.default && slots.default()}
          </div>
        </div>
      </div>
    </div>
  )
}

export const PickerView = uni2Platform(UniPickerView)
