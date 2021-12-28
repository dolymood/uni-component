import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniLivePlayer = uniComponent('uni-live-player', () => {})

// for H5
// mini just use Mini components
UniLivePlayer.render = notSupportRender

export const LivePlayer = uni2Platform(UniLivePlayer)
