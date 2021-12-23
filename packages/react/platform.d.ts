import { FunctionComponent } from 'react'

declare module '@uni-component/core' {
  interface PlatformComponent<P> extends FunctionComponent<P> {}
}
