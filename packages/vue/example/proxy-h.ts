import { h as vueh } from '@vue/runtime-core'

// for jest test
export const proxyh = function (type: string, props?: any, ...children: any[]) {
  if (children) {
    return vueh(type, props, {
      // todo named slot
      default: () => children
    })
  } else {
    return vueh(type, props)
  }
}
