import { FunctionComponent, Fragment } from 'react'

declare module '@uni-component/core' {
  interface PlatformComponent<P> extends FunctionComponent<P> {}
  interface PlatformFragment extends Fragment {}
}
