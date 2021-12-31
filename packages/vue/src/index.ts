import {
  createVNode
} from 'vue'
import { setPlatform } from '@uni-component/core'
import { uni2Vue } from './vue'

export * from './vue'

setPlatform({
  createComponent: uni2Vue,
  createVNode: function (type, props, children) {
    const isPlainNode = typeof type === 'string'
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
    return createVNode(type, props, {
      default: () => children
    })
  }
})
