import classNames from 'classnames'
import { computed, reactive, unref, toRaw } from '@uni-store/core'
import type { UnwrapNestedRefs } from '@uni-store/core'
import { getDefaultProps } from './props'
import type { RawPropTypes, ExtractPropTypes, ExtractDefaultPropTypes } from './props'
import { normalized, equal } from './util'
import { UniNode } from './node'
import { Instance, setCurrentInstance, newInstance } from './instance'
import { onMounted, onUnmounted } from './lifecycle'

interface Context {
  slots: Record<string, any>
  uniParent?: Instance<any, any>
  [key: string]: any
}

const rootInstance: any = {
  children: []
}
let currentIns = rootInstance

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
  FCProps = Partial<Defaults> & Omit<Props, keyof Defaults>,
  State = UnwrapNestedRefs<Omit<S, 'rootClass'>> & { rootClass: string },
  Node extends UniNode = UniNode
> {
  (props: FCProps, context?: Context): Instance<Props, State, Node> & Node
  rawProps?: RawProps
  defaultProps?: Partial<FCProps>
  render: (props: Props, state: State, context: Context) => Node
}

/**
 * Define a uniComponent
 * @param name - Component name
 * @param props - Props
 * @param use - Use component function
 */
export function uniComponent<
  S
> (name: string, setup: (name: string) => S): FCComponent<Readonly<{}>, S>
export function uniComponent<
  PropNames extends string,
  S,
  Props = Readonly<{
    [key in PropNames]?: any
  }>
> (name: string, props: PropNames[], setup: (name: string, props: Props) => S): FCComponent<Props, S, PropNames[]>

export function uniComponent<
  P extends object,
  S,
  Props = Readonly<ExtractPropTypes<P>>
> (name: string, props: P, setup: (name: string, props: Props) => S): FCComponent<Props, S, P>
export function uniComponent (name: string, rawProps?: RawPropTypes | Function, setup?: Function) {
  // class
  // style
  // action

  if (typeof rawProps === 'function') {
    setup = rawProps
    rawProps = undefined
  }

  const normalizedName = normalized(name)

  const helper = {
    // like vue setup function
    [normalizedName]: (props, context: Context = { slots: {} }) => {
      let setupState = {} as {
        rootClass: any
      }

      const state = reactive(setupState)

      if ('uniParent' in context) {
        // vue case
        currentIns = context.uniParent || rootInstance
      } else {
        // react case
        // todo react update cases
        const rawProps = toRaw(props)

        const hasChild = (children: UniNode | UniNode[]) => {
          const _children = Array.isArray(children) ? children : [children]
          const result = _children.find((child: any) => {
            return equal(child.props, rawProps)
          })
          return !!result
        }
        while (currentIns.parent) {
          if (!currentIns.props.children || !hasChild(currentIns.props.children)) {
            currentIns = currentIns.parent
          } else {
            break
          }
        }
      }

      const instance = newInstance(props, state, () => {
        return FC.render(props, state, context)
      }, currentIns)

      let lastIns = currentIns
      currentIns.children.push(instance)
      currentIns = instance

      const preInstance = setCurrentInstance(instance)

      onMounted(() => {
        currentIns = lastIns
      })

      onUnmounted(() => {
        context.uniParent = undefined
        instance.children.length = 0
        const children = lastIns.children
        const i = children.indexOf(instance)
        children.splice(i, 1)
        instance.parent = undefined
      })

      let _state = {} as Record<string, any>
      if (setup) {
        _state = setup(name, props)
      }

      const rootClass = computed(() => {
        const otherRootClass = _state.rootClass
        if (!otherRootClass) {
          return name
        }
        return classNames(name, unref(otherRootClass))
      })

      Object.assign(setupState, _state, {
        rootClass
      })

      setCurrentInstance(preInstance)

      return instance
    }
  } as Record<string, FCComponent<object, object, typeof rawProps>>

  const FC = helper[normalizedName]

  // istanbul ignore next
  FC.render = (props: object, state: object) => {
    throw new Error('must be override `render()`')
  }

  FC.rawProps = rawProps
  const defaultProps = getDefaultProps(rawProps)
  if (defaultProps) {
    FC.defaultProps = defaultProps
  }

  return FC
}
