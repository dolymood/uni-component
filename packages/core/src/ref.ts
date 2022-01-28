import { Ref, UnwrapRef } from '@uni-store/core'

export const __innerSetRef = {
  setter<RefObject extends Ref<any>> (ref: RefObject, el?: UnwrapRef<RefObject>) {
    ref.value = el
  }
}

export function useRef<Type> (ref: Ref<Type | undefined>) {
  return function setRef (el?: Type) {
    __innerSetRef.setter<typeof ref>(ref, el)
  }
}
