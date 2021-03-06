import {
  h,
  uniComponent,
  onMounted,
  onUnmounted,
  uni2Platform,
  useRef,
  PropType,
  watch,
  ref,
  computed
} from '@uni-component/core'
import { useField, FieldType } from '../_/form/field'

const UniInput = uniComponent('uni-input', {
  value: String,
  type: String,
  password: Boolean,
  placeholder: String,
  disabled: Boolean,
  maxlength: {
    type: Number,
    default: 140
  },
  autoFocus: Boolean,
  confirmType: {
    type: String,
    default: 'done'
  },
  name: String,
  nativeProps: Object,
  onInput: Function as PropType<(detail?: {value: string, cursor: number}) => void>,
  onFocus: Function as PropType<(detail: {value: string}) => void>,
  onBlur: Function as PropType<(detail: {value: string}) => void>,
  onConfirm: Function as PropType<(detail: {value: string}) => void>,
  onChange: Function as PropType<(detail: {value: string}) => void>,
  onKeyDown: Function as PropType<(detail: {value: string, cursor: number, keyCode: number}) => void>
}, (_, props) => {
  const rootClass = computed(() => {
    return 'weui-input'
  })

  const input = ref<HTMLInputElement>()
  const setInputRef = useRef(input)

  const value = ref(props.value)
  watch(() => props.value, (newVal) => {
    value.value = newVal
  })

  watch(() => props.autoFocus, (newValue, oldValue) => {
    if (!oldValue && newValue) {
      input.value?.focus()
    }
  })

  const { setFormValue } = useField(props.name || '', FieldType.input)
  watch(() => value.value, (value) => {
    setFormValue(value)
  })

  let isOnComposition = false
  let onInputExcuted = false
  
  const onInput = (e: Event) => {
    e.stopPropagation()
    const {
      type,
      maxlength,
      confirmType,
      password
    } = props
    if (!isOnComposition && !onInputExcuted) {
      const target = e.target as HTMLInputElement
      let val = target.value
      const inputType = getTrueType(type, confirmType, password)
      onInputExcuted = true
      if (inputType === 'number' && value && maxlength <= val.length) {
        val = val.substring(0, maxlength)
        target.value = val
      }

      value.value = val

      props.onInput && props.onInput({
        value: val,
        cursor: val.length
      })
    }
  }

  const onFocus = (e: Event) => {
    const target = e.target as HTMLInputElement
    onInputExcuted = false
    props.onFocus && props.onFocus({
      value: target.value
    })
  }

  const onBlur = (e: Event) => {
    const target = e.target as HTMLInputElement
    props.onBlur && props.onBlur({
      value: target.value
    })
  }

  const onChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    e.stopPropagation()
    props.onChange && props.onChange({
      value: target.value
    })
  }

  const onKeyDown = (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    const keyCode = Number(e.keyCode || e.code)
    onInputExcuted = false

    e.stopPropagation()

    props.onKeyDown && props.onKeyDown({
      value,
      cursor: value.length,
      keyCode
    })

    keyCode === 13 && props.onConfirm && props.onConfirm({ value })
  }

  const onComposition = (e: CompositionEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return    

    if (e.type === 'compositionend') {
      isOnComposition = false
      const val = e.target.value
      props.onInput && props.onInput({ value: val, cursor: val.length })
    } else {
      isOnComposition = true
    }
  }

  let fileListener: () => void
  onMounted(() => {
    const ele = input.value
    if (props.type === 'file') {
      fileListener = () => {
        // todo
        props.onInput && props.onInput()
      }
      ele?.addEventListener('change', fileListener)
    } else {
      ele?.addEventListener('compositionstart', onComposition)
      ele?.addEventListener('compositionend', onComposition)
    }

    props.autoFocus && ele?.focus()
  })
  onUnmounted(() => {
    const ele = input.value
    if (props.type === 'file') {
      ele?.removeEventListener('change', fileListener)
    } else {
      ele?.removeEventListener('compositionstart', onComposition)
      ele?.removeEventListener('compositionend', onComposition)
    }
  })

  return {
    rootClass,
    setInputRef,
    value,
    onInput,
    onFocus,
    onBlur,
    onChange,
    onKeyDown
  }
})

UniInput.render = function (props, state) {
  const {
    type,
    password,
    placeholder,
    disabled,
    maxlength,
    confirmType,
    name,
    nativeProps
  } = props
  const {
    rootClass,
    setInputRef,
    value,
    onInput,
    onFocus,
    onBlur,
    onChange,
    onKeyDown
  } = state

  return (
    <input
      ref={setInputRef}
      class={rootClass}
      value={fixControlledValue(value)}
      type={getTrueType(type, confirmType, password)}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxlength}
      name={name}
      onInput={onInput}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      {...nativeProps}
    />
  )
}

export const Input = uni2Platform(UniInput)

function getTrueType (type: string | undefined, confirmType: string, password: boolean) {
  if (confirmType === 'search') type = 'search'
  if (password) type = 'password'
  if (typeof type === 'undefined') {
    return 'text'
  }
  if (!type) {
    throw new Error('unexpected type')
  }
  if (type === 'digit') type = 'number'

  return type
}

function fixControlledValue (value?: string) {
  return value ?? ''
}
