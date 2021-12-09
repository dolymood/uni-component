import classNames from 'classnames'
import { computed, reactive, unref } from '@uni-store/core'
import type { UnwrapNestedRefs } from '@uni-store/core'
import { getDefaultProps } from './props'
import type { RawPropTypes, ExtractPropTypes, ExtractDefaultPropTypes } from './props'
import { normalized } from './util'
import type { JSX } from './types'

export type UniNode = JSX.Element

export interface FCComponent<
  Props extends {},
  S extends {},
  RawProps extends RawPropTypes = undefined,
  Defaults = ExtractDefaultPropTypes<RawProps>,
  FCProps = {} | Partial<Defaults> & Omit<Props, keyof Defaults>,
  State = UnwrapNestedRefs<Omit<S, 'rootClass'>> & { rootClass: string },
  Node extends UniNode = UniNode,
  Args = any
> {
  /**
    Node is just only for ts
    The real result: State & {
      readonly render: () => Node
    }
   */
  (props: FCProps, ...args: Args[]): State & {
    render: () => Node
  } & Node
  rawProps?: RawProps
  defaultProps?: Partial<FCProps>
  render: (props: Props, state: State, ...args: Args[]) => Node
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
    [normalizedName]: (props, ...args) => {
      let setupState = {} as {
        rootClass: any
      }
      if (setup) {
        setupState = setup(name, props)
      }

      const rootClass = computed(() => {
        const otherRootClass = setupState.rootClass
        if (!otherRootClass) {
          return name
        }
        return classNames(name, unref(otherRootClass))
      })

      Object.assign(setupState, {
        rootClass
      })

      Object.defineProperty(setupState, 'render', {
        enumerable: false,
        configurable: false,
        get () {
          return () => {
            return FC.render(props, state, ...args)
          }
        }
      })

      const state = reactive(setupState)

      // vue tsx just return render()
      // .vue, should return state
      // react, should return state
      return state
    }
  } as Record<string, FCComponent<object, object, typeof rawProps>>

  const FC = helper[normalizedName]

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
