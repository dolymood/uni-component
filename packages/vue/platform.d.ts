import * as RuntimeCore from '@vue/runtime-core'

type VueComponent<P> = {
  new(props: P, ...args: any[]): RuntimeCore.ComponentPublicInstance<P>
}

type VueFragment = typeof RuntimeCore.Fragment

declare module '@uni-component/core' {
  interface PlatformClassComponent<P> extends VueComponent<P> {}
  interface PlatformClassFragment extends VueFragment {}
  interface UniNode extends RuntimeCore.VNode {}
}
