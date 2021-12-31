import { UniNode, FCComponent } from './node'
import { RawPropTypes } from './props'

export interface PlatformComponent<P> {
  (props: P): any
  [key: string]: any
}

export interface PlatformVNode extends UniNode {}

export interface Platform {
  createComponent: <
    Props extends {},
    S,
    RawProps extends RawPropTypes,
    Defaults,
    FCProps
  >(UniComponent: FCComponent<Props, S, RawProps, Defaults, FCProps>, render?: FCComponent<Props & { children?: PlatformVNode }, S, RawProps>['render']) => PlatformComponent<FCProps>
  createVNode: (type: any, props?: any, children?: any) => UniNode
}

// istanbul ignore next
function createComponent <
  Props extends {},
  S,
  RawProps extends RawPropTypes,
  Defaults,
  FCProps
>(
  UniComponent: FCComponent<Props, S, RawProps, Defaults, FCProps>,
  render?: FCComponent<Props, S, RawProps>['render']
) {
  if (render) {
    UniComponent.render = render
  }
  return UniComponent
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
  }
}

let platform: Platform = defaultPlatform

export function setPlatform (config: Platform) {
  platform = config
}

export function getPlatform () {
  return platform
}
