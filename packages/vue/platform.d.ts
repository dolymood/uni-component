import * as RuntimeCore from '@vue/runtime-core'

// type VueComponent<P> = {
//   new(props: P, ...args: any[]): RuntimeCore.ComponentPublicInstance<P>
// }

type DefineComponent = RuntimeCore.DefineComponent

type VueComponent<RawProps, Props> = RawProps extends undefined ?
  DefineComponent<{}> : RawProps extends string[] ?
  DefineComponent<Props> : RawProps extends object ?
  DefineComponent<RawProps> : DefineComponent<{}>

type VueFragment = typeof RuntimeCore.Fragment

declare module '@uni-component/core' {
  interface PlatformClassComponent<P, RawProps> extends VueComponent<RawProps, P> {}
  interface PlatformClassFragment extends VueFragment {}
  interface UniNode extends RuntimeCore.VNode {}
}
