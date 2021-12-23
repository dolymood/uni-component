import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

export const UniEditor = uniComponent('uni-editor', () => {})

// for H5
// mini just use Mini components
UniEditor.render = notSupportRender

export const Editor = uni2Platform(UniEditor)
