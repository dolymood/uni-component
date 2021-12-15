import { useEffect, useLayoutEffect } from 'react'
import type { FunctionComponent, ReactElement, ReactNode } from 'react'
import type { UnwrapNestedRefs } from '@uni-store/core'
import { reactiveReact, useSetup } from '@uni-store/react'
import { invokeMounted, invokeUpdated, invokeUnmounted, getCurrentInstance } from '@uni-component/core'
import type { FCComponent, RawPropTypes } from '@uni-component/core'

export function uni2React<
  Props extends {},
  S,
  RawProps extends RawPropTypes,
  Defaults,
  FCProps
>(
  UniComponent: FCComponent<Props & { children?: ReactNode }, S, RawProps, Defaults, FCProps & { children?: ReactNode }>,
  render: FCComponent<Props & { children?: ReactNode }, S, RawProps>['render']
) {
  UniComponent.render = render
  const FC: FunctionComponent<FCProps> = (props: FCProps & { children?: ReactNode }) => {

    const instance = useSetup((props: UnwrapNestedRefs<FCProps> & { children?: ReactNode }) => {
      const context = {
        slots: {} as Record<string, Function>
      }
      if (props.children) {
        context.slots.default = () => props.children
      }
      return UniComponent(props as FCProps & { children?: ReactNode }, context)
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
  if (UniComponent.defaultProps) {
    FC.defaultProps = UniComponent.defaultProps
  }
  FC.displayName = UniComponent.name
  const RC = reactiveReact(FC)
  return RC
}
