import { h } from '@uni-component/core'
import { Radio, RadioGroup } from '@uni-component/components'

export default function RadioDemo () {
  return (
    <RadioGroup name='radioGroup'>
      <Radio value='radio1'>radio 1</Radio>
      <Radio value='radio2'>radio 2</Radio>
      <Radio value='radio3'>radio 3</Radio>
    </RadioGroup>
  )
}
