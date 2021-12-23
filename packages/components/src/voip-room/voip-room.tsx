import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniVoipRoom = uniComponent('uni-voip-room', () => {})

// for H5
// mini just use Mini components
UniVoipRoom.render = notSupportRender

export const VoipRoom = uni2Platform(UniVoipRoom)
