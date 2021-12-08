import { FunctionComponent, ReactNode } from 'react'
import type { UnwrapNestedRefs } from '@uni-store/core'
import { reactiveReact, useSetup } from '@uni-store/react'
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
    const state = useSetup((props: UnwrapNestedRefs<FCProps>) => {
      return UniComponent(props as FCProps & { children?: ReactNode })
    }, props)
    return (state as any).render()
  }
  if (UniComponent.defaultProps) {
    FC.defaultProps = UniComponent.defaultProps
  }
  return reactiveReact(FC)
}
