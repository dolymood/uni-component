import {
  createVNode
} from 'vue'
import { setPlatform } from '@uni-component/core'
import { uni2Vue } from './vue'

export * from './vue'

setPlatform({
  createComponent: uni2Vue,
  createVNode
})
