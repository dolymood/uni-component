import { markRaw } from '@uni-store/core'
import { UniNode, FCComponent, Context } from './node'

type Provides = Record<symbol | string, any>

export interface Instance<Props extends {}, S extends {}, Node extends UniNode = UniNode, C extends FCComponent<any, any, any> = any> {
  type: C,
  props: Props,
  state: S,
  context: Context,
  parent?: Instance<any, any> | RootInstance,
  children: any[],
  render: () => Node,
  isMounted: boolean,
  isUnmounted: boolean,
  hooks: Record<string, Set<Function>>,
  provides: Provides,
  vnode?: UniNode | undefined
}

export function newInstance <
  Props extends {},
  S extends {},
  P extends Instance<any, any> | RootInstance,
  C extends FCComponent<any, any, any>,
  Node extends UniNode = UniNode
>(props: Props, state: S, context: Context, render: () => Node, C: C, parent: P): Instance<Props, S, Node, C> {
  const instance = markRaw({
    type: C,
    props,
    state,
    context,
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
  parent: undefined,
  props: {},
  context: Context,
  provides: Provides,
  children: any[],
  isUnmounted: boolean,
  hooks: any,
  vnode?: UniNode | undefined
}

// todo use instance
// todo root canbe multi instance by creteXxx
const rootInstance: RootInstance = {
  parent: undefined,
  props: {},
  context: {
    renders: {},
    attrs: {},
    $attrs: {}
  },
  provides: {},
  children: [],
  isUnmounted: false,
  hooks: {}
}

export const getRootInstance = () => rootInstance

let currentInstance: Instance<any, any> | RootInstance = rootInstance

export const setCurrentInstance = (instance: Instance<any, any> | RootInstance) => {
  if (instance.isUnmounted) {
    return currentInstance
  }
  const pre = currentInstance
  currentInstance = instance
  return pre
}

export const getCurrentInstance = () => currentInstance
