import { UniNode, FCComponent } from './node'
import { RawPropTypes } from './props'

export interface PlatformFunctionComponent<P> {
  (props: P, ...args: any[]): any
  [key: string]: any
}
export interface PlatformClassComponent<P, RawProps> {
  new (props: P): any
}

export interface PlatformFunctionFragment {
  (props: any, ...args: any[]): any
  [key: string]: any
}
export interface PlatformClassFragment {
  new (): any
}

export type PlatformComponent<P, RawProps> = PlatformClassComponent<P, RawProps> | PlatformFunctionComponent<P>
export type PlatformFragment = PlatformClassFragment | PlatformFunctionFragment

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
      Props,
      S,
      RawProps,
      Defaults,
      FCProps,
      State
    >['render']
  ) => PlatformComponent<FCProps, RawProps>
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
  return UniComponent as unknown as PlatformComponent<FCProps, RawProps>
}

const defaultPlatform = {
  createComponent,
  createVNode (type: any, props: any, children: any) {
    const node = {
      type,
      props,
      children: children
    }
    return node as unknown as UniNode
  },
  Fragment: {} as PlatformFragment
}

let platform: Platform = defaultPlatform

export function setPlatform (config: Platform) {
  platform = config
}

export function getPlatform () {
  return platform
}
