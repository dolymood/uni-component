import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

export const UniNavigationBar = uniComponent('uni-navigation-bar', () => {})

// for H5
// mini just use Mini components
UniNavigationBar.render = notSupportRender

export const NavigationBar = uni2Platform(UniNavigationBar)
