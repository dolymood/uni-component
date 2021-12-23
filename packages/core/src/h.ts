import { getPlatform } from './platform'

export function h (type: any, props: any, ...children: any) {
  const platform = getPlatform()
  if (children.length === 1) {
    children = children[0]
  } else if (children.length === 0) {
    children = props.children
  }
  const vnode = platform.createVNode(type, props, children)
  return vnode
}
