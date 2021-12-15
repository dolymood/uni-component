import { isFunction } from '@vue/shared'
import { getCurrentInstance } from './instance'

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
