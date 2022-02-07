import { ExtractPropTypes } from '@vue/runtime-core'
import type { JSXBase } from './types'

export type {
  Prop,
  PropType,
  ExtractPropTypes,
  ExtractDefaultPropTypes,
  ComponentPropsOptions
} from '@vue/runtime-core'

export interface GlobalProps<S = {[key: string]: any}> {
  class?: string
  style?: JSXBase.HTMLAttributes['style']
  id?: string
  key?: string
  ref?: ((setupState: S | undefined) => void)
}

export type RawPropTypes = string[] | object | undefined

export function getDefaultProps<
  P extends RawPropTypes,
  Props = ExtractPropTypes<P>
> (rawProps: P): Partial<Props> | null {
  if (!rawProps || Array.isArray(rawProps)) {
    return null
  }

  let defaultProps: Partial<Props> | null = null
  Object.keys(rawProps).forEach(key => {
    const propValue = (rawProps as any)[key]
    let defaultValue

    if (propValue) {
      if (propValue === Boolean || propValue.type === Boolean || (Array.isArray(propValue) && propValue.includes(Boolean)) || (Array.isArray(propValue.type) && propValue.type.includes(Boolean))) {
        // boolean
        if (!propValue.required) {
          defaultValue = 'default' in propValue ? propValue.default : false
        }
      } else {
        // default cases
        if ('default' in propValue) {
          defaultValue = propValue.default
        }
      }
    }
    
    if (defaultValue !== undefined) {
      if (!defaultProps) {
        defaultProps = {}
      }
      (defaultProps as any)[key] = defaultValue
    }
  })
  return defaultProps
}
