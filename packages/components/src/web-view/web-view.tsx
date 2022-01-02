import {
  h,
  uniComponent,
  uni2Platform,
  PropType
} from '@uni-component/core'

const UniWebView = uniComponent('uni-web-view', {
  src: {
    type: String,
    default: '',
    required: true
  },
  onLoad: Function as PropType<(detail: {src: string}) => void>,
  onError: Function as PropType<(detail: {src: string}) => void>
}, (_, props) => {
  const onLoad = (e: Event) => {
    e.stopPropagation()
    props.onLoad && props.onLoad({
      src: props.src
    })
  }
  const onError = (e: Event) => {
    e.stopPropagation()
    props.onError && props.onError({
      src: props.src
    })
  }
  return {
    onLoad,
    onError
  }
})

UniWebView.render = function (props, state) {
  const { src } = props
  const { rootClass, onLoad, onError } = state
  return (
    <iframe
      class={rootClass}
      onLoad={onLoad}
      onError={onError}
      src={src}
    />
  )
}

export const WebView = uni2Platform(UniWebView)
