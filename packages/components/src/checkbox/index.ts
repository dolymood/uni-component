import { Checkbox } from './checkbox'
import { CheckboxGroup } from './checkbox-group'
import './style'

(Checkbox as any).Group = CheckboxGroup

export {
  Checkbox,
  CheckboxGroup
}

export default Checkbox
