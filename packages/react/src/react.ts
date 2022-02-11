import { useEffect, useLayoutEffect, useImperativeHandle } from 'react'
import type { ForwardRefRenderFunction, ReactElement, ReactNode } from 'react'
import type { UnwrapNestedRefs, UnwrapRef } from '@uni-store/core'
import { reactiveReact, useSetup } from '@uni-store/react'
import { invokeMounted, invokeUpdated, invokeUnmounted } from '@uni-component/core'
import type { FCComponent, RawPropTypes, Context } from '@uni-component/core'

export function uni2React<
  Props extends {},
  S,
  RawProps extends RawPropTypes,
  Defaults,
  FCProps,
  State
>(
  UniComponent: FCComponent<Props & { children?: ReactNode }, S, RawProps, Defaults, FCProps & { children?: ReactNode }, State>,
  render?: FCComponent<Props & { children?: ReactNode }, S, RawProps, Defaults, FCProps & { children?: ReactNode }, State>['render']
) {
  if (render) {
    UniComponent.render = render
  }
  const FC: ForwardRefRenderFunction<Partial<UnwrapRef<State>>, FCProps> = (props: FCProps & { children?: ReactNode }, ref) => {
    const instance = useSetup((props: UnwrapNestedRefs<FCProps> & { children?: ReactNode }) => {
      const context = {
        renders: {} as Record<string, Function>
      } as Context

      context.nodeProps = props
      context.FC = RC
      return UniComponent(props as FCProps & { children?: ReactNode }, context)
    }, props)

    useImperativeHandle(ref, () => instance.state, [instance])

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
  const RC = reactiveReact(FC, {
    forwardRef: true
  })
  ;(RC as any).___UNI___ = true
  return RC
}
