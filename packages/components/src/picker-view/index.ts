import { PickerView } from './picker-view'
import { PickerViewColumn } from './picker-view-column'
import './style'

(PickerView as any).Column = PickerViewColumn

export {
  PickerView,
  PickerViewColumn
}

export default PickerView
