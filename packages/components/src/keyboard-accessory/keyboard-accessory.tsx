import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniKeyboardAccessory = uniComponent('uni-keyboard-accessory', () => {})

// for H5
// mini just use Mini components
UniKeyboardAccessory.render = notSupportRender

export const KeyboardAccessory = uni2Platform(UniKeyboardAccessory)
