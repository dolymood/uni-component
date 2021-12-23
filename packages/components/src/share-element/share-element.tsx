import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniShareElement = uniComponent('uni-share-element', () => {})

// for H5
// mini just use Mini components
UniShareElement.render = notSupportRender

export const ShareElement = uni2Platform(UniShareElement)
