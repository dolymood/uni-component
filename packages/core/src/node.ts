import type { UnwrapNestedRefs } from '@uni-store/core'
import type { RawPropTypes, ExtractDefaultPropTypes } from './props'
import type { Instance, RootInstance } from './instance'
import type { VNode, JSXBase } from './types'

export interface Context {
  renders: Record<string, (...args: any[]) => any>
  uniParent?: Instance<any, any> | RootInstance
  attrs: Record<string, any>
  $attrs: Record<string, any>
  nodeProps?: Record<string, any> | null
  [key: string]: any
}

export type UniNode = VNode

export type Style = JSXBase.HTMLAttributes['style']
export type ObjectStyle = Exclude<Style, string | undefined>

export type GetState<S extends {}> = UnwrapNestedRefs<Omit<S, 'rootClass' | 'rootStyle' | 'rootId'>> & { rootClass: string, rootStyle: ObjectStyle, rootId?: string }

export interface GlobalProps {
  class?: string
  style?: Style
  id?: string
  key?: string
  ref?: (target: {[key: string]: any} | HTMLElement | undefined) => void
}

/**
 * Notes:
 * `Node` is just only for ts
 * The real result: `State & { readonly render: () => Node }`
*/
export interface FCComponent<
  Props extends {},
  S extends {},
  RawProps extends RawPropTypes = undefined,
  Defaults = ExtractDefaultPropTypes<RawProps>,
  FCProps = Partial<Defaults> & Omit<Props, keyof Defaults> & GlobalProps,
  State = GetState<S>,
  Node extends UniNode = UniNode
> {
  (props: FCProps, context?: Context): Instance<Props, State, Node> & Node
  rawProps?: RawProps
  ___UNI___: true
  render: (props: Props, state: State, context: Context) => Node
}
