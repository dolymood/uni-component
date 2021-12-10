import { defineComponent as vueDefine, DefineComponent } from '@vue/runtime-core'
import type { FCComponent } from '@uni-component/core'

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
  UniComponent: FCComponent<any, any>,
  render: FCComponent<any, any>['render']
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
    const result = rawSetup!(props, context)
    // todo async cases
    return (result as any).render
  }
  return component
}
