import type { UnwrapNestedRefs } from '@uni-store/core'
import type { RawPropTypes, ExtractDefaultPropTypes } from './props'
import { Instance } from './instance'
import { VNode } from './types'

export interface Context {
  slots: Record<string, any>
  uniParent?: Instance<any, any>
  [key: string]: any
}

export type UniNode = VNode

export type GetState<S extends {}> = UnwrapNestedRefs<Omit<S, 'rootClass'>> & { rootClass: string }

export interface GlobalProps {
  class?: string
  key?: string
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
  defaultProps?: Partial<FCProps>
  ___UNI___: true
  render: (props: Props, state: State, context: Context) => Node
}
