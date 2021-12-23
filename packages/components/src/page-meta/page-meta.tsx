import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniPageMeta = uniComponent('uni-page-meta', () => {})

// for H5
// mini just use Mini components
UniPageMeta.render = notSupportRender

export const PageMeta = uni2Platform(UniPageMeta)
