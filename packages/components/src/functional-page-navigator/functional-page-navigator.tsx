import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniFunctionalPageNavigator = uniComponent('uni-functional-page-navigator', () => {})

// for H5
// mini just use Mini components
UniFunctionalPageNavigator.render = notSupportRender

export const FunctionalPageNavigator = uni2Platform(UniFunctionalPageNavigator)
