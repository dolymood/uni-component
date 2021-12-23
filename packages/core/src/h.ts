import { getPlatform } from './platform'

export function h (type: any, props: any, ...children: any) {
  const platform = getPlatform()
  const vnode = platform.createVNode(type, props, children)
  return vnode
}
