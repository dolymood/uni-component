import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniMatchMedia = uniComponent('uni-match-media', () => {})

// for H5
// mini just use Mini components
UniMatchMedia.render = notSupportRender

export const MatchMedia = uni2Platform(UniMatchMedia)
