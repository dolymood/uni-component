import React, { useEffect, useLayoutEffect } from 'react'
import type { FunctionComponent, ReactElement, ReactNode } from 'react'
import type { UnwrapNestedRefs } from '@uni-store/core'
import { reactiveReact, useSetup } from '@uni-store/react'
import { invokeMounted, invokeUpdated, invokeUnmounted } from '@uni-component/core'
import type { FCComponent, RawPropTypes, Context, Instance } from '@uni-component/core'

if (process.env.NODE_ENV !== 'production') {
  // force set to undefined
  (Object as any).preventExtensions = undefined
}

let ReactSharedInternals = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

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
    const current = ReactSharedInternals.ReactCurrentOwner.current
    current.elementType.___UNI___
    current.return
    let uniParent: Instance<any, any> | undefined
    let p = current.return
    while (p) {
      if (p.__UNI_INSTANCE__) {
        uniParent = p.__UNI_INSTANCE__
        break
      } else {
        p = p.return
      }
    }
    const instance = useSetup((props: UnwrapNestedRefs<FCProps> & { children?: ReactNode }) => {
      const context = {
        renders: {} as Record<string, Function>
      } as Context

      context.nodeProps = props
      context.uniParent = uniParent
      return UniComponent(props as FCProps & { children?: ReactNode }, context)
    }, props)

    current.__UNI_INSTANCE__ = instance

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
      delete (current as any).__UNI_INSTANCE__
    }, [instance])
    return instance.render() as ReactElement<any, any>
  }
  FC.displayName = UniComponent.name
  const RC = reactiveReact(FC)
  ;(RC as any).___UNI___ = true
  return RC
}
