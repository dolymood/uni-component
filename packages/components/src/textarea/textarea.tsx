import { h, uniComponent, onMounted, uni2Platform, useRef } from '@uni-component/core'
import { watch, ref, computed } from '@uni-store/core'
import { useField, FieldType } from '../_/form/field'

const UniTextarea = uniComponent('uni-textarea', {
  value: String,
  placeholder: String,
  disabled: Boolean,
  maxlength: {
    type: Number,
    default: 140
  },
  autoFocus: Boolean,
  autoHeight: Boolean,
  name: String,
  nativeProps: Object,
  onInput: Function,
  onFocus: Function,
  onBlur: Function,
  onChange: Function,
  onLineChange: Function
}, (_, props) => {
  const rootClass = computed(() => {
    return props.autoHeight ? 'auto-height' : ''
  })

  const textarea = ref<HTMLTextAreaElement>()
  const setTextareaRef = useRef(textarea)

  const value = ref(props.value)
  watch(() => props.value, (newVal) => {
    value.value = newVal
  })

  watch(() => props.autoFocus, (newValue, oldValue) => {
    if (!oldValue && newValue) {
      textarea.value?.focus()
    }
  })

  const { setFormValue } = useField(props.name || '', FieldType.textarea)
  watch(() => value.value, (value) => {
    setFormValue(value)
  })

  const onInput = (e: Event) => {
    e.stopPropagation()
    onLineChange()
    const target = e.target as HTMLTextAreaElement
    const val = target.value
    value.value = val
    props.onInput && props.onInput({
      value: val,
      cursor: val.length
    })
  }

  const onFocus = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    props.onFocus && props.onFocus({
      value: target.value
    })
  }

  const onBlur = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    props.onBlur && props.onBlur({
      value: target.value
    })
  }

  const onChange = (e: Event) => {
    e.stopPropagation()
    const target = e.target as HTMLTextAreaElement
    props.onChange && props.onChange({
      value: target.value
    })
  }

  const line = ref(1)
  const onLineChange = () => {
    const _line = getNumberOfLines()
    if (_line !== line.value) {
      line.value = _line
      props.onLineChange && props.onLineChange({
        height: textarea.value!.clientHeight,
        lineCount: _line
      })
    }
  }

  const calculateContentHeight = (ta: HTMLTextAreaElement, scanAmount:number) => {
    const origHeight = ta.style.height
    let height = ta.offsetHeight
    const scrollHeight = ta.scrollHeight
    const overflow = ta.style.overflow

    /// only bother if the ta is bigger than content
    if (height >= scrollHeight) {
      /// check that our browser supports changing dimension
      /// calculations mid-way through a function call...
      ta.style.height = height + scanAmount + 'px'
      /// because the scrollbar can cause calculation problems
      ta.style.overflow = 'hidden'
      /// by checking that scrollHeight has updated
      if (scrollHeight < ta.scrollHeight) {
        /// now try and scan the ta's height downwards
        /// until scrollHeight becomes larger than height
        while (ta.offsetHeight >= ta.scrollHeight) {
          ta.style.height = (height -= scanAmount) + 'px'
        }
        /// be more specific to get the exact height
        while (ta.offsetHeight < ta.scrollHeight) {
          ta.style.height = height++ + 'px'
        }
        /// reset the ta back to it's original height
        ta.style.height = origHeight
        /// put the overflow back
        ta.style.overflow = overflow
        return height
      }
    } else {
      return scrollHeight
    }
  }

  const getNumberOfLines = () => {
    const ta = textarea.value!
    const style = window.getComputedStyle ? window.getComputedStyle(ta) : ta.style
    // This will get the line-height only if it is set in the css,
    // otherwise it's "normal"
    const taLineHeight = parseInt(style.lineHeight, 10)
    // Get the scroll height of the textarea
    const taHeight = calculateContentHeight(ta, taLineHeight)
    // calculate the number of lines
    const numberOfLines = Math.floor(taHeight! / taLineHeight)

    return numberOfLines
  }

  onMounted(() => {
    const ele = textarea.value
    props.autoFocus && ele?.focus()
  })

  return {
    rootClass,
    setTextareaRef,
    line,
    value,
    onInput,
    onFocus,
    onBlur,
    onChange
  }
})

UniTextarea.render = function (props, state) {
  const {
    placeholder,
    disabled,
    maxlength,
    autoFocus,
    autoHeight,
    name,
    nativeProps
  } = props
  const {
    rootClass,
    value,
    setTextareaRef,
    line,
    onInput,
    onFocus,
    onBlur,
    onChange
  } = state

  const otherProps: {
    [props: string]: any
  } = {}

  if (autoHeight) {
    otherProps.rows = line
  }

  return (
    <textarea
      ref={setTextareaRef}
      class={rootClass}
      value={fixControlledValue(value)}
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      maxlength={maxlength}
      autofocus={autoFocus}
      onInput={onInput}
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
      {...nativeProps}
      {...otherProps}
    />
  )
}

export const Textarea = uni2Platform(UniTextarea)

function fixControlledValue(value?: string) {
  return value ?? ''
}
