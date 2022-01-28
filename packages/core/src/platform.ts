import { UniNode, FCComponent } from './node'
import { RawPropTypes } from './props'

export interface PlatformComponent<P> {
  (props: P, ...args: any[]): any
  [key: string]: any
}

export interface PlatformClassComponent<P> {}

export interface PlatformFragment {
  (props: any, ...args: any[]): any
  [key: string]: any
}
export interface PlatformClassFragment {}


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
  ) => (PlatformComponent<FCProps> | PlatformClassComponent<FCProps>)
  createVNode: (type: any, props?: any, children?: any) => UniNode
  Fragment: PlatformFragment | PlatformClassFragment
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
  return UniComponent as unknown as PlatformComponent<FCProps>
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
  Fragment: {} as PlatformFragment
}

let platform: Platform = defaultPlatform

export function setPlatform (config: Platform) {
  platform = config
}

export function getPlatform () {
  return platform
}
