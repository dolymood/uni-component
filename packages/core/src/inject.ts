import { isFunction } from '@vue/shared'
import { ref, Ref, UnwrapRef } from '@uni-store/core'
import { getCurrentInstance } from './instance'
import { onMounted, onUpdated } from './lifecycle'

export interface InjectionKey<T> extends Symbol {}

export function provide<T>(key: InjectionKey<T> | string, value: T) {
  const currentInstance = getCurrentInstance()
  if (currentInstance) {
    let provides = currentInstance.provides
    const parentProvides = currentInstance.parent && currentInstance.parent.provides
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides)
    }
    const k = key as string | symbol
    provides[k] = value
  }
}

export function inject<T>(key: InjectionKey<T> | string): T | undefined
export function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T
export function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: () => T,
  treatDefaultAsFactory: true
): T
export function inject(key: string | InjectionKey<any>, defaultValue?: unknown, treatDefaultAsFactory: boolean = false) {
  const instance = getCurrentInstance()
  const provides = instance?.provides
  const k = key as string | symbol
  if (provides && k in provides) {
    return provides[k]
  } else if (arguments.length > 1) {
    return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue() : defaultValue
  }
}

export function capture<T>(key: InjectionKey<T> | string): Ref<UnwrapRef<T> | undefined>
export function capture<T>(key: InjectionKey<T> | string, defaultValue: T): Ref<UnwrapRef<T> | undefined>
export function capture<T>(
  key: InjectionKey<T> | string,
  defaultValue: () => T,
  treatDefaultAsFactory: true
): Ref<UnwrapRef<T> | undefined>
export function capture(key: string | InjectionKey<any>, defaultValue?: unknown, treatDefaultAsFactory: boolean = false) {
  const instance = getCurrentInstance()
  const target = ref()
  const setTarget = () => {
    let newTarget
    const children = instance.children
    for (const child of children) {
      const provides = child.provides
      const k = key as string | symbol
      if (provides && k in provides) {
        newTarget = provides[k]
        break
      }
    }
    if (newTarget === undefined && arguments.length > 1) {
      newTarget = treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue() : defaultValue
    }
    if (target.value !== newTarget) {
      target.value = newTarget
    }
  }
  onMounted(setTarget)
  onUpdated(setTarget)

  return target
}
