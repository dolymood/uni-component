import { h } from '@uni-component/core'
import {
  Form,
  Input,
  Textarea,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Slider,
  Switch
} from '@uni-component/components'

export default function FormDemo () {
  return (
    <Form>
      <Input name='input' value='form input'></Input>
      <Textarea name='textarea' value='form textarea'></Textarea>
      <CheckboxGroup name="checkboxGroup">
        <Checkbox value='checkbox1'>checkbox 1</Checkbox>
        <Checkbox value='checkbox2'>checkbox 2</Checkbox>
      </CheckboxGroup>
      <RadioGroup name="radioGroup">
        <Radio value='radio1'>radio 1</Radio>
        <Radio value='radio2'>radio 2</Radio>
      </RadioGroup>
      <Slider value={30}></Slider>
      <Switch type='switch' />
    </Form>
  )
}
