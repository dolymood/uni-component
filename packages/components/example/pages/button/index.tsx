import { h } from '@uni-component/core'
import { Button } from '@uni-component/components'

export default function ButtonDemo () {
  return (
    <div>
      <Button type="primary">页面主操作 Normal</Button>
      <Button type="primary" loading>页面主操作 Loading</Button>
      <Button type="primary" disabled>页面主操作 Disabled</Button>

      <Button type="default">页面次要操作 Normal</Button>
      <Button type="default" disabled>页面次要操作 Disabled</Button>

      <Button type="warn">警告类操作 Normal</Button>
      <Button type="warn" disabled>警告类操作 Disabled</Button>

      <Button type="primary" plain>按钮</Button>
      <Button type="primary" disabled plain>不可点击的按钮</Button>
      <Button type="default" plain>按钮</Button>
      <Button type="default" disabled plain>按钮</Button>
      <Button type="warn" plain>警告类操作 Normal</Button>
      <Button type="warn" disabled plain>警告类操作 Disabled</Button>

      <Button class="mini-btn" type="primary" size="mini">按钮</Button>
      <Button class="mini-btn" type="default" size="mini">按钮</Button>
      <Button class="mini-btn" type="warn" size="mini">按钮</Button>
    </div>
  )
}
