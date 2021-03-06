import { h, uniComponent, inject, uni2Platform, PropType, watch, ref, computed } from '@uni-component/core'
import { RadioGroupProvide, radioGroupProvide } from './radio-group'
import { useField, FieldType } from '../_/form/field'

const UniRadio = uniComponent('uni-radio', {
  name: String,
  value: String,
  color: String,
  checked: Boolean,
  disabled: Boolean,
  nativeProps: Object,
  onChange: Function as PropType<(detail: {value?: string}) => void>
}, (_, props) => {
  const radioGroup = inject<RadioGroupProvide>(radioGroupProvide)

  const rootClass = 'weui-cells_checkbox'

  const eleName = computed(() => {
    return radioGroup ? radioGroup.name.value : props.name
  })

  const { setFormValue } = useField(eleName.value || '', FieldType.radio)

  const checked = ref(props.checked)
  watch(() => props.checked, (newChecked) => {
    checked.value = newChecked
  })
  watch(() => checked.value, (isChecked) => {
    setFormValue(isChecked ? props.value : undefined)
  })
  watch(() => radioGroup?.value.value, (newVal) => {
    const val = props.value || ''
    checked.value = newVal === val
  })

  const onClick = () => {
    if (props.disabled) return
    if (!checked.value) {
      checked.value = true
      const value = props.value
      props.onChange && props.onChange({
        value
      })
      if (radioGroup) {
        const val = value || ''
        const groupValue = radioGroup.value
        groupValue.value = val
      }
    }
  }

  const onChange = (e: Event) => {
    e.stopPropagation()
    const target = e.target as HTMLInputElement
    checked.value = target.checked
  }

  return {
    rootClass,
    eleName,
    checked,
    onChange,
    onClick
  }
})

UniRadio.render = function (props, state, { renders }) {
  const { value, color, disabled, nativeProps } = props
  const { rootClass, eleName, checked, onChange, onClick } = state

  return (
    <div class={rootClass} onClick={onClick}>
      <input
        type='radio'
        value={value}
        name={eleName}
        class='weui-check'
        style={{ color }}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...nativeProps}
      />
      <i class='weui-icon-checked' />
      { renders.defaultRender && renders.defaultRender() }
    </div>
  )
}

export const Radio = uni2Platform(UniRadio)
