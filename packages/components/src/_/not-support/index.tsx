import { h, FCComponent } from '@uni-component/core'

export const notSupportRender = function (this: FCComponent<any, any>) {
  const name = this.name
  const msg = `"${name}" is not supported in Web!`
  return (
    <div>{ msg }</div>
  )
}
