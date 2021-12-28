import { Radio } from './radio'
import { RadioGroup } from './radio-group'
import './style'

(Radio as any).Group = RadioGroup

export {
  Radio,
  RadioGroup
}

export default Radio
