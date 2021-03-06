import { h, uniComponent, provide, uni2Platform, PropType, watch, ref, computed, ComputedRef, Ref } from '@uni-component/core'

export const radioGroupProvide = 'uni-radio-group'

export interface RadioGroupProvide {
  name: ComputedRef<string>
  value: Ref<string>
}

const UniRadioGroup = uniComponent('uni-radio-group', {
  name: String,
  onChange: Function as PropType<(detail: {value?: string}) => void>
}, (_, props) => {
  const uniqueName = Date.now().toString(36)
  const value = ref<string>()
  const name = computed(() => {
    return props.name || uniqueName
  })

  provide(radioGroupProvide, {
    name,
    value
  })

  const rootClass = computed(() => {
    return {
      'weui-cells_radiogroup': true
    }
  })

  watch(() => value.value, (value) => {
    props.onChange && props.onChange({ value })
  })

  return {
    rootClass,
    name,
    value
  }
})

UniRadioGroup.render = function (_, state, { renders }) {
  const { rootClass } = state

  return (
    <div class={rootClass}>
      { renders.defaultRender && renders.defaultRender() }
    </div>
  )
}

export const RadioGroup = uni2Platform(UniRadioGroup)
