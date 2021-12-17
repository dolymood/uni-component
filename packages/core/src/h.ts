import { UniNode } from './node'

// todo
// 1. implementation
// 2. slot
export function h (type: any, props: any, children: any = props.children) {
  const node = {
    type,
    props,
    children: children
  }
  return node as UniNode
}
