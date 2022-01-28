import classNames from 'classnames'
import { computed, reactive, unref, watchEffect, shallowReactive } from '@uni-store/core'
import { getDefaultProps } from './props'
import type { RawPropTypes, ExtractPropTypes, ComponentPropsOptions } from './props'
import type { FCComponent, Context } from './node'
import { normalized, mergeStyle, camelize } from './util'
import {
  newInstance,
  setCurrentInstance,
  getCurrentInstance,
  getRootInstance
} from './instance'
import { onMounted, onUpdated, onUnmounted } from './lifecycle'
import { getPlatform } from './platform'

const rootInstance = getRootInstance()

type BeforeFn = (props: {}, state: {}, context: Context, UniComponent: FCComponent<any, any, any>) => void
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

  const defaultProps = getDefaultProps(rawProps) as null | Record<string, any>

  const helper = {
    // like vue setup function
    [normalizedName]: (props, context?: Context) => {
      const processedAttrs = context?.attrs
      if (!context) {
        context = { renders: {}, attrs: {}, $attrs: {} }
      }

      let setupState = {} as {
        rootId?: string
        rootClass: any,
        rootStyle: any
      }

      const state = reactive(setupState)

      const _props = shallowReactive({} as Record<string, any>)
      const renders = shallowReactive({} as Context['renders'])
      const attrs = processedAttrs ? context!.attrs : shallowReactive({} as Record<string, any>)
      const $attrs = shallowReactive({} as Record<string, any>)
      // todo renders type
      // prop xxRender to renders
      const propToRenders = (key: string, val: any) => {
        const renderMatch = key.match(/(.+)Render$/)
        if (renderMatch && typeof val === 'function') {
          renders[key] = val
        }
      }
      const reset = (data: Record<string, any>) => {
        Object.keys(data).forEach((k) => {
          delete data[k]
        })
      }

      const contextProps = computed(() => {
        reset(_props)
        reset(renders)
        reset($attrs)
        if (processedAttrs) {
          // vue case
          // collect deps
          Object.keys(props).forEach((propKey: string) => {
            const val = (props as any)[propKey]
            _props[propKey] = val
            propToRenders(propKey, val)
          })
          // todo dynamic slots?
          const slots = context!.slots
          // slots to xxRender
          Object.keys(slots).forEach((name) => {
            const val = (...args: any[]) => slots[name](...args)
            if (val) {
              const key = `${camelize(name)}Render`
              _props[key] = val
              propToRenders(key, val)
            }
          })
        } else {
          reset(attrs)
          // handle attrs
          Object.keys(props).forEach((propKey: string) => {
            const val = (props as any)[propKey]

            propToRenders(propKey, val)

            let hasProp = FC.rawProps && (
              Array.isArray(FC.rawProps) ? (FC.rawProps as any[]).includes(propKey) : FC.rawProps.hasOwnProperty(propKey)
            )
            if (hasProp) {
              _props[propKey] = val
            } else if (propKey === 'children') {
              // _props[propKey] = val
              propToRenders('defaultRender', () => val)
            } else {
              attrs[propKey] = val
              delete _props[propKey]
            }
          })
          // default props
          FC.rawProps && Object.keys(FC.rawProps).forEach((propKey) => {
            if ((props as any)[propKey] === undefined) {
              // use default
              const config = (FC.rawProps as any)![propKey]
              let defaultVal = defaultProps![propKey]
              if (config && config.type !== Function && typeof defaultVal === 'function') {
                // do not support instance now
                defaultVal = defaultVal()
              }
              propToRenders(propKey, defaultVal)
              _props[propKey] =  defaultVal
            }
          })
        }

        Object.keys(attrs).forEach((key) => {
          // class style id
          if (key === 'class' || key === 'id' || key === 'style') {
            // skip class id style
            return
          }
          const val = attrs[key]
          $attrs[key] = val
          // keep renders passed to children
          propToRenders(key, val)
        })

        return {
          props: _props,
          attrs,
          $attrs,
          renders
        }
      })

      const runBeforeHooks = (props: Record<string, any>) => {
        befores.forEach((beforeFn) => {
          beforeFn(props, setupState, context!, FC)
        })
      }

      const def = (key: 'attrs' | '$attrs' | 'renders') => {
        Object.defineProperty(context, key, {
          configurable: true,
          get () {
            return contextProps.value[key]
          }
        })
      }
      const finialProps = computed(() => {
        const _props = contextProps.value.props
        runBeforeHooks(_props)
        return _props
      })
      if (!processedAttrs) {
        def('attrs')
      }
      def('$attrs')
      def('renders')

      // handle instance
      let lastIns = getCurrentInstance()
      if ('uniParent' in context!) {
        lastIns = context.uniParent || rootInstance
      }

      const instance = newInstance(contextProps.value.props, state, context!, () => {
        setCurrentInstance(instance)
        const nodes = FC.render(finialProps.value, state, context!)
        return nodes
      }, FC, lastIns)

      setCurrentInstance(instance)

      let _state = {} as Record<string, any>
      if (setup) {
        _state = setup(name, finialProps.value, context!)
      }

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
        const ctx = context as any
        const ins = instance as any

        delete ctx.uniParent
        delete ctx.nodeProps
        delete ctx.$attrs
        delete ctx.attrs
        delete ctx.renders
        ins.children.length = 0
        ins.provides = {}
        ins.state = {}
        ins.props = {}
        ins.hooks = {}
        ins.render = undefined
        ins.type = undefined
        ins.context = undefined
        const children = lastIns.children
        const i = children.indexOf(instance)
        children.splice(i, 1)
        instance.parent = undefined
      })

      const rootClass = computed(() => {
        const otherRootClass = _state && _state.rootClass
        return classNames(name, unref(otherRootClass), context!.attrs.class)
      })
      const rootStyle = computed(() => {
        const otherRootStyle = unref(_state && _state.rootStyle)
        const inlineStyle = context!.attrs.style
        return mergeStyle(otherRootStyle, inlineStyle)
      })

      Object.assign(setupState, _state, {
        rootClass,
        rootStyle,
        rootId: computed(() => context!.attrs.id)
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
  FCProps,
  State
>(
  UniComponnet: FCComponent<Props, S, RawProps, Defaults, FCProps, State>,
  render?: FCComponent<Props, S, RawProps, Defaults, FCProps, State>['render']
) {
  const platform = getPlatform()
  return platform.createComponent<Props, S, RawProps, Defaults, FCProps, State>(UniComponnet, render)
}
