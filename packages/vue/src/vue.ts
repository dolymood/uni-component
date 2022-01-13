import {
  defineComponent as vueDefine,
  getCurrentInstance,
  onMounted,
  onUpdated,
  onUnmounted
} from 'vue'
import type {
  DefineComponent
} from 'vue'
import { invokeMounted, invokeUpdated, invokeUnmounted, Context } from '@uni-component/core'
import type { FCComponent, Instance } from '@uni-component/core'

export type DefineComponentFn = typeof vueDefine

const defineComponent: DefineComponentFn = (options: any) => {
  return typeof options === 'function' ? {
    name: options.name,
    setup: options
  } : options
}

interface FunctionVue<P> {
  (props: P): any
}

export function uni2Vue<
  Props,
  S,
  RawProps extends undefined,
  Defaults,
  FCProps
>(
  UniComponent: FCComponent<Props, S, RawProps, Defaults, FCProps>,
  render?: FCComponent<Props, S, RawProps, Defaults, FCProps>['render']
): DefineComponent<RawProps> & FunctionVue<FCProps>
export function uni2Vue<
  Props,
  S,
  RawProps extends string[],
  Defaults,
  FCProps
>(
  UniComponent: FCComponent<Props, S, RawProps, Defaults, FCProps>,
  render?: FCComponent<Props, S, RawProps, Defaults, FCProps>['render']
): DefineComponent<RawProps> & FunctionVue<FCProps>
export function uni2Vue<
  Props,
  S,
  RawProps extends object,
  Defaults,
  FCProps
>(
  UniComponent: FCComponent<Props, S, RawProps, Defaults, FCProps>,
  render?: FCComponent<Props, S, RawProps, Defaults, FCProps>['render']
): DefineComponent<RawProps> & FunctionVue<FCProps>

export function uni2Vue(
  UniComponent: FCComponent<any, any, any>,
  render?: FCComponent<any, any, any>['render']
) {
  if (render) {
    UniComponent.render = render
  }
  let component: DefineComponent
  const rawProps = UniComponent.rawProps
  if (rawProps) {
    component = defineComponent({
      inheritAttrs: false,
      name: UniComponent.name,
      props: rawProps,
      setup: UniComponent
    })
  } else {
    component = defineComponent({
      inheritAttrs: false,
      name: UniComponent.name,
      setup: UniComponent
    })
  }
  const rawSetup = component.setup
  component.setup = function (props, context) {
    const vueInstance = getCurrentInstance()
    let uniParent: Instance<any, any> | undefined
    let p = vueInstance?.parent as any
    while (p) {
      if (p.__UNI_INSTANCE__) {
        uniParent = p.__UNI_INSTANCE__
        break
      } else {
        p = p.parent
      }
    }
    const uniContext = Object.assign({}, context) as Context
    uniContext.uniParent = uniParent
    uniContext.nodeProps = vueInstance?.vnode.props

    const instance = rawSetup!(props, uniContext as any) as Instance<any, any>
    ;(vueInstance as any).__UNI_INSTANCE__ = instance

    const invoke = (hook: Function) => {
      return () => {
        hook(instance)
      }
    }
    onMounted(invoke(invokeMounted))
    onUpdated(invoke(invokeUpdated))
    onUnmounted(() => {
      invoke(invokeUnmounted)
      delete (vueInstance as any).__UNI_INSTANCE__
    })

    // todo async cases
    return (instance as Instance<any, any>).render
  }
  return component
}
