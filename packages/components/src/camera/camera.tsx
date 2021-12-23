import {
  uni2Platform,
  uniComponent
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniCamera = uniComponent('uni-camera', () => {})

// for H5
// mini just use Mini components
UniCamera.render = notSupportRender

export const Camera = uni2Platform(UniCamera)
