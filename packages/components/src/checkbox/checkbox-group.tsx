import { h, uniComponent, provide, uni2Platform } from '@uni-component/core'
import { watch, ref, computed, ComputedRef, Ref } from '@uni-store/core'

export const checkboxGroupProvide = 'uni-checkbox-group'

export interface CheckboxGroupProvide {
  name: ComputedRef<string>
  value: Ref<string[]>
}

const UniCheckboxGroup = uniComponent('uni-checkbox-group', {
  name: String,
  onChange: Function
}, (_, props) => {
  const uniqueName = Date.now().toString(36)
  const value = ref<string[]>([])
  const name = computed(() => {
    return props.name || uniqueName
  })

  provide(checkboxGroupProvide, {
    name,
    value
  })

  watch(() => value.value, (value) => {
    props.onChange && props.onChange({ value })
  })

  return {
    name,
    value
  }
})

UniCheckboxGroup.render = function (_, state, { slots }) {
  const { rootClass } = state

  return (
    <div class={rootClass}>
      { slots.default && slots.default() }
    </div>
  )
}

export const CheckboxGroup = uni2Platform(UniCheckboxGroup)
