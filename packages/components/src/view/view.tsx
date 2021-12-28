import {
  h,
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { useView, props, render } from '../_/view'

const UniView = uniComponent('uni-view', props, (_, props) => {
  return useView(props)
})

// for H5
// mini just use Mini components
UniView.render = render

export const View = uni2Platform(UniView)
