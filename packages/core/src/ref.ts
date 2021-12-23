import { Ref } from '@uni-store/core'

export function useRef<Type> (ref: Ref<Type | undefined>) {
  return function setRef (el?: Type) {
    ref.value = el
  }
}
