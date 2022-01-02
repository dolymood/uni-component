import {
  h,
  onMounted,
  PropType,
  uniComponent,
  classNames,
  uni2Platform,
  useRef
} from '@uni-component/core'
import { ref, computed } from '@uni-store/core'

export type Mode =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'

const UniImage = uniComponent('uni-image', {
  src: {
    type: String,
    default: '',
    required: true
  },
  mode: {
    type: String as PropType<Mode>,
    default: 'scaleToFill'
  },
  lazyLoad: Boolean,
  nativeProps: Object,
  onLoad: Function as PropType<(detail: {width: number, height: number}) => void>,
  onError: Function as PropType<() => void>,
}, (name, props) => {
  let aspectFillMode = ref('width')

  const rootClass = computed(() => {
    return {
      [`${name}__widthfix`]: props.mode === 'widthFix'
    }
  })
  const imgClass = computed(() => {
    const mode = props.mode
    const cls = {
      [`uni-img__mode-${mode.toLowerCase().replace(/\s/g, '')}`]: true,
      [`uni-img__mode-aspectfill--${aspectFillMode.value}`]: mode === 'aspectFill'
    }
    return classNames(cls)
  })

  const img = ref<HTMLImageElement>()
  const setImgRef = useRef(img)

  onMounted(() => {
    if (!props.lazyLoad) return

    const lazyImg = new IntersectionObserver(entries => {
      if (entries[entries.length - 1].isIntersecting) {
        lazyImg.unobserve(img.value!)
        img.value!.src = props.src
      }
    }, {
      rootMargin: '300px 0px'
    })

    lazyImg.observe(img.value!)
  })

  const onLoad = () => {
    const {
      width,
      height,
      naturalWidth,
      naturalHeight
    } = img.value!

    props.onLoad && props.onLoad({
      width,
      height
    })

    aspectFillMode.value = naturalWidth > naturalHeight ? 'width' : 'height'
  }

  const onError = () => {
    props.onError && props.onError()
  }

  return {
    rootClass,
    imgClass,
    setImgRef,
    onLoad,
    onError
  }
})

UniImage.render = function (props, state) {
  const {
    src,
    lazyLoad,
    nativeProps
  } = props
  const {
    rootClass,
    imgClass,
    setImgRef,
    onLoad,
    onError
  } = state

  return (
    <div class={rootClass}>
      {lazyLoad ? (
        <img
          ref={setImgRef}
          class={imgClass}
          onLoad={onLoad}
          onError={onError}
          {...nativeProps}
        />
      ) : (
        <img
          ref={setImgRef}
          class={imgClass}
          src={src}
          onLoad={onLoad}
          onError={onError}
          {...nativeProps}
        />
      )}
    </div>
  )
}

export const Image = uni2Platform(UniImage)
