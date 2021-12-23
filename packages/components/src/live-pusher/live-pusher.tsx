import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniLivePusher = uniComponent('uni-live-pusher', () => {})

// for H5
// mini just use Mini components
UniLivePusher.render = notSupportRender

export const LivePusher = uni2Platform(UniLivePusher)
