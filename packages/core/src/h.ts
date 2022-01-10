import { getPlatform, PlatformFragment } from './platform'
import { JSXBase } from './types'

export function h (type: any, props: any, ...children: any[]) {
  const platform = getPlatform()
  if (!Fragment) {
    Fragment = platform.Fragment
  }
  if (children.length === 0) {
    children = props.children || []
  }
  if (children && !Array.isArray(children)) {
    children = [children]
  }
  const vnode = platform.createVNode(type, props, children)
  return vnode
}

let Fragment: PlatformFragment

export {
  Fragment
}

export namespace h {
  export namespace JSX {
    export interface IntrinsicElements extends JSXBase.IntrinsicElements {
      [tagName: string]: any;
    }
  }
}
