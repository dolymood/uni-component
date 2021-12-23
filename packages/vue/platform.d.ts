import type { DefineComponent } from 'vue'

declare module '@uni-component/core' {
  interface PlatformComponent<P> extends DefineComponent<P> {}
}
