import { MovableArea } from './movable-area'
import { MovableView } from './movable-view'
import './style'

(MovableArea as any).View = MovableView

export { MovableArea, MovableView }
export default MovableArea
