import {
  createVNode,
  Fragment
} from 'vue'
import { PlatformFragment, setPlatform, UniNode } from '@uni-component/core'
import { uni2Vue } from './vue'

export * from './vue'

setPlatform({
  Fragment: Fragment as unknown as PlatformFragment,
  createComponent: uni2Vue,
  createVNode: function (type, props, children) {
    const isPlainNode = typeof type === 'string'
    const isFragment = type === Fragment
    if (props) {
      isPlainNode && Object.keys(props).forEach((key) => {
        if (key.indexOf('on') === 0) {
          // process on events
          const val = props[key]
          delete props[key]
          const newKey = key.replace(/([A-Z][^A-Z]+)([A-Z].+)/, (_, name, ext) => {
            return name + ext.toLowerCase()
          })
          props[newKey] = val
        }
      })
      // dev info
      delete props.__source
      delete props.__self
    }
    const slotContent = children && children.length ? children : undefined
    const slots: Record<string, () => UniNode> = {}
    if (slotContent) {
      slots.default = () => slotContent
    }
    return createVNode(type, props, isPlainNode ? slotContent : isFragment ? (slotContent || []) : slots)
  }
})
