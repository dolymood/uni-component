import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniOpenData = uniComponent('uni-open-data', () => {})

// for H5
// mini just use Mini components
UniOpenData.render = notSupportRender

export const OpenData = uni2Platform(UniOpenData)
