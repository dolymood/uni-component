import { h, uniComponent, provide, uni2Platform, PropType, watch, ref, computed, ComputedRef } from '@uni-component/core'

export const checkboxGroupProvide = 'uni-checkbox-group'

export interface CheckboxGroupProvide {
  name: ComputedRef<string>
  onCheckboxChange: (val: string, isChecked: boolean) => void
}

const UniCheckboxGroup = uniComponent('uni-checkbox-group', {
  name: String,
  onChange: Function as PropType<(detail: {value: string[]}) => void>
}, (_, props) => {
  const uniqueName = Date.now().toString(36)
  const value = ref<string[]>([])
  const name = computed(() => {
    return props.name || uniqueName
  })

  const onCheckboxChange = (val: string, isChecked: boolean) => {
    const groupValue = value.value
    if (isChecked) {
      !groupValue.includes(val) && groupValue.push(val)
    } else {
      const index = groupValue.indexOf(val)
      groupValue.splice(index, 1)
    }
  }

  provide(checkboxGroupProvide, {
    name,
    onCheckboxChange
  })

  watch(() => value.value, (value) => {
    props.onChange && props.onChange({ value })
  })

  return {
    name,
    value
  }
})

UniCheckboxGroup.render = function (_, state, { renders }) {
  const { rootClass } = state

  return (
    <div class={rootClass}>
      { renders.defaultRender && renders.defaultRender() }
    </div>
  )
}

export const CheckboxGroup = uni2Platform(UniCheckboxGroup)
