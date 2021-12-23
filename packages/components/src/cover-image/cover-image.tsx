import { h, uniComponent, uni2Platform, useRef } from '@uni-component/core'
import { ref } from '@uni-store/core'

// todo dependon ele ref to get width height

const UniCoverImage = uniComponent('uni-cover-image', {
  src: String,
  nativeProps: Object,
  onLoad: Function,
  onError: Function
}, (_, props) => {
  const img = ref<HTMLImageElement>()
  // todo with ref supported
  const setRef = useRef(img)

  const onLoad = () => {
    const imgEle = img.value

    props.onLoad && props.onLoad({
      width: imgEle?.width,
      height: imgEle?.height
    })
  }
  const onError = () => {
    props.onError && props.onError()
  }

  return {
    setRef,
    onLoad,
    onError
  }
})

UniCoverImage.render = function (props, state) {
  const { src, nativeProps } = props
  const { rootClass, setRef, onLoad, onError } = state
  return (
    <img
      class={rootClass}
      ref={setRef}
      src={src}
      onLoad={onLoad}
      onError={onError}
      {...nativeProps}
    />
  )
}

export const CoverImage = uni2Platform(UniCoverImage)
