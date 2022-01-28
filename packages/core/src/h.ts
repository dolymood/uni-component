import { getPlatform, PlatformFragment, PlatformClassFragment } from './platform'
import { JSXBase } from './types'

export function h (type: any, props: any, ...children: any[]) {
  const platform = getPlatform()
  if (!Fragment) {
    Fragment = platform.Fragment
  }
  if (children.length === 0) {
    children = (props && props.children) || []
  }
  if (children && !Array.isArray(children)) {
    children = [children]
  }
  children = children.filter((child) => child !== undefined)
  const vnode = platform.createVNode(type, props, children)
  return vnode
}

let Fragment: PlatformFragment | PlatformClassFragment

export {
  Fragment
}

export declare namespace h {
  export namespace JSX {
    interface ElementClass {
      $props: {}
    }
    interface ElementAttributesProperty {
      $props: {}
    }
    export interface IntrinsicElements extends JSXBase.IntrinsicElements {
      [tagName: string]: any;
    }
  }
}
