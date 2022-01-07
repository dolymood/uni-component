import type { DefineComponent, Fragment } from 'vue'

declare module '@uni-component/core' {
  interface PlatformComponent<P> extends DefineComponent<P> {}
  interface PlatformFragment extends Fragment {}
}
