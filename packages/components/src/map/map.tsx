import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniMap = uniComponent('uni-map', () => {})

// for H5
// mini just use Mini components
UniMap.render = notSupportRender

export const Map = uni2Platform(UniMap)
