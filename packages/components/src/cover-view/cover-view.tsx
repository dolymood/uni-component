import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { useView, props, render } from '../_/view'

const UniCoverView = uniComponent('uni-cover-view', props, (_, props) => {
  return useView(props)
})

// for H5
// mini just use Mini components
UniCoverView.render = render

export const CoverView = uni2Platform(UniCoverView)
