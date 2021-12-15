import { markRaw } from '@uni-store/core'
import { UniNode } from './node'

type Provides = Record<symbol | string, any>

export interface Instance<Props extends {}, S extends {}, Node extends UniNode = UniNode> {
  props: Props,
  state: S,
  parent?: Instance<any, any>,
  children: any[],
  render: () => Node,
  isMounted: boolean,
  isUnmounted: boolean,
  hooks: Record<string, Set<Function>>,
  provides: Provides
}

export function newInstance <
  Props extends {},
  S extends {},
  P extends Instance<any, any>,
  Node extends UniNode = UniNode
>(props: Props, state: S, render: () => Node, parent?: P): Instance<Props, S, Node> {
  const instance = markRaw({
    props,
    state,
    render,
    children: [],
    isMounted: false,
    isUnmounted: false,
    hooks: {},
    parent: parent,
    provides: parent ? parent.provides : {}
  })

  return instance
}

let currentInstance: Instance<any, any> | undefined = undefined

export const setCurrentInstance = (instance?: Instance<any, any>) => {
  const pre = currentInstance
  currentInstance = instance
  return pre
}

export const getCurrentInstance = () => currentInstance
