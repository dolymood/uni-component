import { markRaw } from '@uni-store/core'
import { UniNode, FCComponent } from './node'

type Provides = Record<symbol | string, any>

export interface Instance<Props extends {}, S extends {}, Node extends UniNode = UniNode, C extends FCComponent<any, any, any> = any> {
  type: C,
  props: Props,
  state: S,
  parent?: Instance<any, any> | RootInstance,
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
  P extends Instance<any, any> | RootInstance,
  C extends FCComponent<any, any, any>,
  Node extends UniNode = UniNode
>(props: Props, state: S, render: () => Node, C: C, parent: P): Instance<Props, S, Node, C> {
  const instance = markRaw({
    type: C,
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

  parent.children.push(instance)

  return instance
}

export interface RootInstance {
  parent: undefined
  props: {}
  provides: Provides
  children: any[],
  hooks: any
}

const rootInstance: RootInstance = {
  parent: undefined,
  props: {},
  provides: {},
  children: [],
  hooks: {}
}

export const getRootInstance = () => rootInstance

let currentInstance: Instance<any, any> | RootInstance = rootInstance

export const setCurrentInstance = (instance: Instance<any, any> | RootInstance) => {
  const pre = currentInstance
  currentInstance = instance
  return pre
}

export const getCurrentInstance = () => currentInstance
