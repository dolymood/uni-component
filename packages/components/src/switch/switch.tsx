import { h, uniComponent, uni2Platform, PropType } from '@uni-component/core'
import { watch, ref, computed } from '@uni-store/core'
import { useField, FieldType } from '../_/form/field'

const UniSwitch = uniComponent('uni-switch', {
  type: {
    type: String as PropType<'switch' | 'checkbox'>,
    default: 'switch'
  },
  checked: Boolean,
  color: {
    type: String,
    default: '#04BE02'
  },
  name: String,
  disabled: Boolean,
  nativeProps: Object,
  onChange: Function as PropType<(detail: {value: boolean}) => void>
}, (_, props) => {
  const rootClass = computed(() => `weui-${props.type}`)

  const value = ref(props.checked)
  watch(() => props.checked, (newVal) => {
    value.value = newVal
  })
  const { setFormValue } = useField(props.name || '', FieldType.switch)
  watch(() => value.value, (value) => {
    setFormValue(value)
  })

  const style = computed(() => {
    const color = props.color
    return value.value ?
      { borderColor: color, backgroundColor: color }
      : {}
  })

  const onChange = (e: Event) => {
    e.stopPropagation()
    const target = e.target as HTMLInputElement
    const checked = target.checked
    value.value = checked
    props.onChange && props.onChange({
      value: checked
    })
  }

  return {
    rootClass,
    value,
    style,
    onChange
  }
})

UniSwitch.render = function (props, state) {
  const { name, disabled, nativeProps } = props
  const { rootClass, value, style, onChange } = state

  return (
    <input
      type='checkbox'
      class={rootClass}
      style={style}
      checked={value}
      name={name}
      disabled={disabled}
      onChange={onChange}
      {...nativeProps}
    />
  )
}

export const Switch = uni2Platform(UniSwitch)
