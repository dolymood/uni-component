import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniVideo = uniComponent('uni-video', () => {})

// for H5
// mini just use Mini components
UniVideo.render = notSupportRender

export const Video = uni2Platform(UniVideo)
