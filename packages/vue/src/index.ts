import {
  defineComponent as vueDefine,
  getCurrentInstance,
  onMounted,
  onUpdated,
  onUnmounted
} from '@vue/runtime-core'
import type {
  DefineComponent
} from '@vue/runtime-core'
import { invokeMounted, invokeUpdated, invokeUnmounted } from '@uni-component/core'
import type { FCComponent, Instance } from '@uni-component/core'

export type DefineComponentFn = typeof vueDefine

const defineComponent: DefineComponentFn = (options: any) => {
  return typeof options === 'function' ? {
    name: options.name,
    setup: options
  } : options
}

export function uni2Vue<Props, S, RawProps extends undefined>(
  UniComponent: FCComponent<Props, S, RawProps>,
  render: FCComponent<Props, S, RawProps>['render']
): DefineComponent<RawProps>
export function uni2Vue<Props, S, RawProps extends string[]>(
  UniComponent: FCComponent<Props, S, RawProps>,
  render: FCComponent<Props, S, RawProps>['render']
): DefineComponent<RawProps>
export function uni2Vue<Props, S, RawProps extends object>(
  UniComponent: FCComponent<Props, S, RawProps>,
  render: FCComponent<Props, S, RawProps>['render']
): DefineComponent<RawProps>

export function uni2Vue(
  UniComponent: FCComponent<any, any, any>,
  render: FCComponent<any, any, any>['render']
) {
  UniComponent.render = render
  let component: DefineComponent
  const rawProps = UniComponent.rawProps
  if (rawProps) {
    component = defineComponent({
      name: UniComponent.name,
      props: rawProps,
      setup: UniComponent
    })
  } else {
    component = defineComponent(UniComponent)
  }
  const rawSetup = component.setup
  component.setup = function (props, context) {
    const vueInstance = getCurrentInstance()
    let uniParent: Instance<any, any> | null = null
    let p = vueInstance?.parent as any
    while (p) {
      if (p.__UNI_INSTANCE__) {
        uniParent = p.__UNI_INSTANCE__
        break
      } else {
        p = p.parent
      }
    }
    context = Object.assign({}, context)
    ;(context as any).uniParent = uniParent
    const instance = rawSetup!(props, context) as Instance<any, any>
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
