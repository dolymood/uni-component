import { h } from '@uni-component/core'
import { MovableArea, MovableView } from '@uni-component/components'

export default function MovableAreaDemo () {
  return (
    <div style={{position: 'relative', width: '100px', height: '100px', background: '#999'}}>
      <MovableArea width={100} height={100}>
        <MovableView>movable view</MovableView>
      </MovableArea>
    </div>
  )
}
