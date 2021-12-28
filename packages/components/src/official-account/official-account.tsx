import {
  uniComponent,
  uni2Platform
} from '@uni-component/core'
import { notSupportRender } from '../_/not-support'

const UniOfficialAccount = uniComponent('uni-official-account', () => {})

// for H5
// mini just use Mini components
UniOfficialAccount.render = notSupportRender

export const OfficialAccount = uni2Platform(UniOfficialAccount)
