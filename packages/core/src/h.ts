import { getPlatform } from './platform'

export function h (type: any, props: any, ...children: any) {
  const platform = getPlatform()
  if (children.length === 0) {
    children = props.children || []
  }
  if (children && !Array.isArray(children)) {
    children = [children]
  }
  const vnode = platform.createVNode(type, props, children)
  return vnode
}
