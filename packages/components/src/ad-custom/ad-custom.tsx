import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniAdCustom = uniComponent('uni-ad-custom', () => {
  return {}
})

// for H5
// mini just use Mini components
UniAdCustom.render = notSupportRender

export const AdCustom = uni2Platform(UniAdCustom)
