import { Ref } from '@uni-store/core'
import { getPlatform } from './platform'

export function useRef<Type> (ref: Ref<Type | undefined>) {
  const { createRef } = getPlatform()
  if (createRef) {
    return createRef<Type>((el) => {
      ref.value = el
    })
  } else {
    return function setRef (el?: Type) {
      ref.value = el
    }
  }
}
