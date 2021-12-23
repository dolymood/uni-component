import { UniNode, FCComponent } from './node'
import { RawPropTypes } from './props'

export interface PlatformComponent<P> {
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

let platform: Platform

export function setPlatform (config: Platform) {
  platform = config
}

export function getPlatform () {
  if (!platform) {
    throw new Error('[@uni-component/core]: should setPlatform before run.')
  }
  return platform
}
