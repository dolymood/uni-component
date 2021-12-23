import { h } from '@uni-component/core'
import { Checkbox, CheckboxGroup } from '@uni-component/components'

export default function CameraDemo () {
  return (
    <div>
      <Checkbox value='single1'>single checkbox</Checkbox>
      <Checkbox value='single2' checked>single checkbox 2</Checkbox>
      <br></br>
      <CheckboxGroup name='group'>
        <Checkbox value='group1'>group 1</Checkbox>
        <Checkbox value='group2'>group 2</Checkbox>
      </CheckboxGroup>
    </div>
  )
}
