import { h, uniComponent, inject, uni2Platform } from '@uni-component/core'
import { watch, ref, computed } from '@uni-store/core'
import { CheckboxGroupProvide, checkboxGroupProvide } from './checkbox-group'
import { useField, FieldType } from '../_/form/field'

const UniCheckbox = uniComponent('uni-checkbox', {
  name: String,
  value: String,
  color: String,
  checked: Boolean,
  disabled: Boolean,
  nativeProps: Object,
  onChange: Function
}, (name, props) => {
  const checkboxGroup = inject<CheckboxGroupProvide>(checkboxGroupProvide)

  const rootClass = 'weui-cells_checkbox'
  const checkedClass = `${name}_checked`

  const eleName = computed(() => {
    return checkboxGroup ? checkboxGroup.name.value : props.name
  })

  const { setFormValue } = useField(eleName.value || '', FieldType.checkbox)

  const checked = ref(props.checked)
  watch(() => props.checked, (newChecked) => {
    checked.value = newChecked
  })
  watch(() => checked.value, (isChecked) => {
    setFormValue(isChecked ? props.value : undefined)
  })

  const onChange = (e: Event) => {
    e.stopPropagation()
    const isChecked = checked.value = !checked.value
    const value = props.value
    props.onChange && props.onChange({
      checked: isChecked,
      value
    })
    if (checkboxGroup) {
      checkboxGroup.onCheckboxChange(value || '', isChecked)
    }
  }

  return {
    rootClass,
    checkedClass,
    eleName,
    checked,
    onChange
  }
})

UniCheckbox.render = function (props, state, { slots }) {
  const { value, color, disabled, nativeProps } = props
  const { rootClass, checkedClass, eleName, checked, onChange } = state

  return (
    <div class={rootClass}>
      <input
        type='checkbox'
        value={value}
        name={eleName}
        class={checkedClass}
        style={{ color }}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        {...nativeProps}
      />
      { slots.default && slots.default() }
    </div>
  )
}

export const Checkbox = uni2Platform(UniCheckbox)
