import { h, uniComponent, uni2Platform, PropType } from '@uni-component/core'

const LONG_TAP_DELAY = 500

const UniCanvas = uniComponent('uni-canvas', {
  canvasId: String,
  nativeProps: Object,
  onLongTap: Function as PropType<() => void>
}, (_, props) => {
  let timer: NodeJS.Timeout

  const onTouchStart = () => {
    timer = setTimeout(() => {
      props.onLongTap && props.onLongTap()
    }, LONG_TAP_DELAY)
  }

  const onTouchMove = () => {
    clearTimeout(timer)
  }

  const onTouchEnd = () => {
    clearTimeout(timer)
  }

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
})

UniCanvas.render = function (props, state) {
  const { canvasId, nativeProps } = props
  const {
    rootClass,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  } = state
  return (
    <canvas
      class={rootClass}
      canvas-id={canvasId}
      style={{
        width: '100%',
        height: '100%'
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      {...nativeProps}
    />
  )
}

export const Canvas = uni2Platform(UniCanvas)
