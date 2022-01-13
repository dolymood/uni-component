import { ExtractPropTypes } from '@vue/runtime-core'
export type {
  Prop,
  PropType,
  ExtractPropTypes,
  ExtractDefaultPropTypes,
  ComponentPropsOptions
} from '@vue/runtime-core'

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
    if (propValue === Boolean || propValue.type === Boolean) {
      // boolean
      if (!propValue.required) {
        defaultValue = 'default' in propValue ? propValue.default : false
      }
    } else if (propValue) {
      // default cases
      if ('default' in propValue) {
        defaultValue = propValue.default
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
