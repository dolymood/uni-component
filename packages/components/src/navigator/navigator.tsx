import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

export const UniNavigator = uniComponent('uni-navigator', () => {})

// for H5
// mini just use Mini components
UniNavigator.render = notSupportRender

export const Navigator = uni2Platform(UniNavigator)
