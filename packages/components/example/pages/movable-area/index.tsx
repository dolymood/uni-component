import { h } from '@uni-component/core'
import { MovableArea, MovableView } from '@uni-component/components'

export default function MovableAreaDemo () {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50px',
    width: '50px',
    background: '#1AAD19',
    color: '#fff'
  }
  // todo replace div with view when style is supported
  const Text = <div style={style}>text</div>
  return (
    <div style={{position: 'relative', width: '200px', height: '200px', background: '#999'}}>
      <MovableArea width={200} height={200}>
        <MovableView x={10} y={10} direction='all'>{Text}</MovableView>
      </MovableArea>
    </div>
  )
}
