import { useEffect, useLayoutEffect } from 'react'
import type { FunctionComponent, ReactElement, ReactNode } from 'react'
import { toRaw, shallowReactive, watchEffect } from '@uni-store/core'
import type { UnwrapNestedRefs } from '@uni-store/core'
import { reactiveReact, useSetup } from '@uni-store/react'
import { invokeMounted, invokeUpdated, invokeUnmounted, getDefaultProps } from '@uni-component/core'
import type { FCComponent, RawPropTypes, Context } from '@uni-component/core'

export function uni2React<
  Props extends {},
  S,
  RawProps extends RawPropTypes,
  Defaults,
  FCProps
>(
  UniComponent: FCComponent<Props & { children?: ReactNode }, S, RawProps, Defaults, FCProps & { children?: ReactNode }>,
  render?: FCComponent<Props & { children?: ReactNode }, S, RawProps>['render']
) {
  if (render) {
    UniComponent.render = render
  }
  const FC: FunctionComponent<FCProps> = (props: FCProps & { children?: ReactNode }) => {
    const instance = useSetup((props: UnwrapNestedRefs<FCProps> & { children?: ReactNode }) => {
      const context: Context = {
        slots: {} as Record<string, Function>,
        attrs: {}
      }
      if (props.children) {
        context.slots.default = () => props.children
      }
      if ((props as any).slots) {
        Object.assign(context.slots, (props as any).slots)
      }

      const _props = shallowReactive({ ...toRaw(props) }) as Record<string, any>

      const defaultProps = getDefaultProps(UniComponent.rawProps) as null | Record<string, any>

      watchEffect(() => {
        // node props
        context.nodeProps = props

        // handle attrs
        const attrs = {} as Record<string, any>
        Object.keys(props).forEach((propKey: string) => {
          const val = (props as any)[propKey]
          if (!UniComponent.rawProps || !UniComponent.rawProps.hasOwnProperty(propKey)) {
            attrs[propKey] = val
            delete _props[propKey]
          }
        })
        context.attrs = shallowReactive(attrs)

        // default props
        defaultProps && Object.keys(defaultProps).forEach((propKey) => {
          if ((props as any)[propKey] === undefined) {
            // use default
            const config = (UniComponent.rawProps as any)![propKey]
            let defaultVal = defaultProps[propKey]
            if (config && config.type !== Function && typeof defaultVal === 'function') {
              // do not support instance now
              defaultVal = defaultVal()
            }
            _props[propKey] =  defaultVal
          }
        })
      })

      return UniComponent(_props as FCProps & { children?: ReactNode }, context)
    }, props)

    // updated
    useLayoutEffect(() => {
      if (instance.isMounted) {
        invokeUpdated(instance)
      }
    })
    // mounted
    useLayoutEffect(() => {
      invokeMounted(instance)
    }, [instance])
    // unmounted
    useEffect(() => () => {
      invokeUnmounted(instance)
    }, [instance])
    return instance.render() as ReactElement<any, any>
  }
  FC.displayName = UniComponent.name
  const RC = reactiveReact(FC)
  return RC
}
