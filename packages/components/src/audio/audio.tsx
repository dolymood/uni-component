import { h, uniComponent, uni2Platform, onMounted } from '@uni-component/core'

const UniAudio = uniComponent('uni-audio', {
  src: String,
  controls: {
    type: Boolean,
    default: true
  },
  autoplay: Boolean,
  loop: Boolean,
  muted: Boolean,
  nativeProps: Object,
  onError: Function,
  onPlay: Function,
  onPause: Function,
  onTimeUpdate: Function,
  onEnded: Function
}, (name, props) => {

  onMounted(() => {
    console.log('mounted')
  })

  // todo should bind events when mounted
  const onTimeUpdate = (e: Event) => {
    const target = (e.srcElement || e.currentTarget) as HTMLMediaElement
    props.onTimeUpdate && props.onTimeUpdate({
      duration: target!.duration,
      currentTime: target!.duration
    })
  }

  const onEnded = () => {
    props.onEnded && props.onEnded()
  }

  const onPlay = () => {
    props.onPlay && props.onPlay()
  }

  const onPause = (e: Event) => {
    props.onPause && props.onPause(e)
  }

  // 1网络错误, 2解码错误, 3解码错误，4 不合适资源
  const onError = (e: Event) => {
    const target = (e.srcElement || e.currentTarget) as HTMLMediaElement
    props.onError && props.onError(target.error?.code)
  }
  return {
    onTimeUpdate,
    onEnded,
    onPlay,
    onPause,
    onError
  }
})

UniAudio.render = function (props, state) {
  const {
    src,
    controls,
    autoplay,
    loop,
    muted,
    nativeProps
  } = props
  const {
    rootClass,
    onTimeUpdate,
    onEnded,
    onPlay,
    onPause,
    onError
  } = state
  return (
    <audio
      class={rootClass}
      src={src}
      controls={controls}
      autoplay={autoplay}
      loop={loop}
      muted={muted}
      onTimeUpdate={onTimeUpdate}
      onEnded={onEnded}
      onPlay={onPlay}
      onPause={onPause}
      onError={onError}
      {...nativeProps}
    />
  )
}

export const Audio = uni2Platform(UniAudio)
