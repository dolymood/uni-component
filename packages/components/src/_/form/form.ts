import { Ref } from '@uni-store/core'
export const formProvide = 'uni-form-provide'

export interface FormProvide {
  value: Ref<Record<string, any>>
  hash: Record<string, any>
}
