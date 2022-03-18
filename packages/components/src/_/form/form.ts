import { Ref } from '@uni-component/core'
export const formProvide = 'uni-form-provide'

export interface FormProvide {
  value: Ref<Record<string, any>>
  hash: Record<string, any>
}
