import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniPageContainer = uniComponent('uni-page-container', () => {})

// for H5
// mini just use Mini components
UniPageContainer.render = notSupportRender

export const PageContainer = uni2Platform(UniPageContainer)
