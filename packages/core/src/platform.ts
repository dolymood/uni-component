import { UniNode, FCComponent } from './node'
import { RawPropTypes } from './props'

export interface PlatformFunctionComponent<P> {
  (props: P, ...args: any[]): any
  [key: string]: any
}
export interface PlatformClassComponent<P> {}

export interface PlatformFunctionFragment {
  (props: any, ...args: any[]): any
  [key: string]: any
}
export interface PlatformClassFragment {}

export type PlatformComponent<P> = PlatformFunctionComponent<P> | PlatformClassComponent<P>
export type PlatformFragment = PlatformFunctionFragment | PlatformClassFragment
export interface PlatformVNode extends UniNode {}

export interface Platform {
  createComponent: <
    Props extends {},
    S,
    RawProps extends RawPropTypes,
    Defaults,
    FCProps,
    State
  >(
    UniComponent: FCComponent<
      Props,
      S,
      RawProps,
      Defaults,
      FCProps,
      State
    >,
    render?: FCComponent<
      Props & { children?: PlatformVNode },
      S,
      RawProps,
      Defaults,
      FCProps,
      State
    >['render']
  ) => PlatformComponent<FCProps>
  createVNode: (type: any, props?: any, children?: any) => UniNode
  Fragment: PlatformFragment
}

// istanbul ignore next
function createComponent <
  Props extends {},
  S,
  RawProps extends RawPropTypes,
  Defaults,
  FCProps,
  State
>(
  UniComponent: FCComponent<Props, S, RawProps, Defaults, FCProps, State>,
  render?: FCComponent<Props, S, RawProps, Defaults, FCProps, State>['render']
) {
  if (render) {
    UniComponent.render = render
  }
  return UniComponent as unknown as PlatformFunctionComponent<FCProps>
}

const defaultPlatform = {
  createComponent,
  createVNode (type: any, props: any, children: any) {
    const node = {
      type,
      props,
      children: children
    }
    return node as UniNode
  },
  Fragment: {} as PlatformFunctionFragment
}

let platform: Platform = defaultPlatform

export function setPlatform (config: Platform) {
  platform = config
}

export function getPlatform () {
  return platform
}
