import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniAd = uniComponent('uni-ad', () => {
  return {}
})

// for H5
// mini just use Mini components
UniAd.render = notSupportRender

export const Ad = uni2Platform(UniAd)
