import classNames from 'classnames'
import { computed, reactive, unref, watchEffect } from '@uni-store/core'
import type { RawPropTypes, ExtractPropTypes, ComponentPropsOptions } from './props'
import type { FCComponent, Context } from './node'
import { normalized, equal, inlineStyle2Obj } from './util'
import { UniNode } from './node'
import {
  Instance,
  RootInstance,
  newInstance,
  setCurrentInstance,
  getCurrentInstance,
  getRootInstance
} from './instance'
import { onMounted, onUpdated, onUnmounted } from './lifecycle'
import { getPlatform } from './platform'

const rootInstance = getRootInstance()

type BeforeFn = (props: {}, state: {}, context: Context) => void
const befores: BeforeFn[] = []
export const beforeUniSetup = (beforeFn: BeforeFn) => {
  !befores.includes(beforeFn) && befores.push(beforeFn)
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
> (name: string, props: PropNames[], setup: (name: string, props: Props, context: Context) => S): FCComponent<Props, S, PropNames[]>

export function uniComponent<
  P extends Readonly<ComponentPropsOptions>,
  S,
  Props = Readonly<ExtractPropTypes<P>>
> (name: string, props: P, setup: (name: string, props: Props, context: Context) => S): FCComponent<Props, S, P>
export function uniComponent (name: string, rawProps?: RawPropTypes | Function, setup?: Function) {
  // class
  // style
  // action

  // rodo attrs
  // extract(props, rawProps)

  if (typeof rawProps === 'function') {
    setup = rawProps
    rawProps = undefined
  }

  const normalizedName = normalized(name)

  const helper = {
    // like vue setup function
    [normalizedName]: (props, context?: Context) => {
      if (!context) {
        context = { slots: {}, attrs: {} }
      }

      let setupState = {} as {
        rootId?: string
        rootClass: any,
        rootStyle: any
      }

      const state = reactive(setupState)

      // handle instance
      let lastIns = getCurrentInstance()
      let currentIns = lastIns
      if ('uniParent' in context) {
        lastIns = context.uniParent || rootInstance
      } else {
        // normal case
        // find parent
        // <A><B><C></C></B></A>

        const hasChild = (children: UniNode | UniNode[]) => {
          const _children = Array.isArray(children) ? children : [children]
          // todo for performance, do not check children.children fornow
          // for plain components cases
          // <UniA><ReactX><UniB></UniB></ReactX></UniA>
          // can not get correct relations
          const result = _children.find((child: any) => {
            return child && equal(child.props, props) && child.type === FC
          })
          return !!result
        }
        const isFull = (ins: Instance<any, any> | RootInstance) => {
          const children = ins.children
          let propsChildren = ins.props.children
          if (!Array.isArray(propsChildren)) {
            propsChildren = [propsChildren]
          }
          propsChildren = propsChildren.filter((child: any) => {
            return child && child.type.___UNI___
          })
          return children.length >= propsChildren.length
        }
        while (lastIns) {
          // todo can not have plain components
          if (!lastIns.props || !lastIns.props.children || !hasChild(lastIns.props.children) || isFull(lastIns)) {
            lastIns = lastIns.parent!
          } else {
            break
          }
        }

        if (lastIns === undefined) {
          // fallback
          // B = <div></div>
          // A = <B></B>
          // <A></A>
          lastIns = currentIns
        } 
      }

      const instance = newInstance(props, state, () => {
        setCurrentInstance(instance)
        const nodes = FC.render(props, state, context!)
        return nodes
      }, FC, lastIns)

      setCurrentInstance(instance)

      watchEffect(() => {
        befores.forEach((beforeFn) => {
          beforeFn(props, setupState, context!)
        })
      })

      onMounted(() => {
        // created case
        setCurrentInstance(instance.parent!)
      })
      onUpdated(() => {
        // updated case, rerender
        setCurrentInstance(instance.parent!)
      })

      onUnmounted(() => {
        setCurrentInstance(instance.parent!)
        context!.uniParent = undefined
        context!.nodeProps = undefined
        instance.children.length = 0
        instance.provides = {}
        instance.props = {}
        const children = lastIns.children
        const i = children.indexOf(instance)
        children.splice(i, 1)
        instance.parent = undefined
      })

      let _state = {} as Record<string, any>
      if (setup) {
        _state = setup(name, props, context!)
      }

      const rootClass = computed(() => {
        const otherRootClass = _state && _state.rootClass
        return classNames(name, unref(otherRootClass), context?.attrs.class)
      })
      const rootStyle = computed(() => {
        const otherRootStyle = unref(_state && _state.rootStyle)
        const inlineStyle = context?.attrs.style
        const styles = [otherRootStyle, inlineStyle]
        return styles.reduce((style, val) => {
          if (val) {
            if (typeof val === 'string') {
              val = inlineStyle2Obj(val)
            }
            Object.assign(style, val)
          }
          return style
        }, {} as Record<string, any>)
      })

      Object.assign(setupState, _state, {
        rootClass,
        rootStyle,
        rootId: computed(() => context?.attrs.id)
      })

      return instance
    }
  } as Record<string, FCComponent<object, object, typeof rawProps>>

  const FC = helper[normalizedName]

  // istanbul ignore next
  FC.render = (props: object, state: object) => {
    throw new Error('must be override `render()`')
  }

  FC.___UNI___ = true

  FC.rawProps = rawProps

  return FC
}

export function uni2Platform <
  Props extends {},
  S,
  RawProps extends RawPropTypes,
  Defaults,
  FCProps
>(
  UniComponnet: FCComponent<Props, S, RawProps, Defaults, FCProps>,
  render?: FCComponent<Props, S, RawProps, Defaults, FCProps>['render']
) {
  const platform = getPlatform()
  return platform.createComponent<Props, S, RawProps, Defaults, FCProps>(UniComponnet, render)
}
