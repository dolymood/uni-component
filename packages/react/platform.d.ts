import React from 'react'

type Fragment = typeof React.Fragment
type FWC<P, T> = React.ForwardRefRenderFunction<T, P> & React.MemoExoticComponent<
React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
  >
>

declare module '@uni-component/core' {
  interface PlatformFunctionComponent<P> extends FWC<P, any> {}
  interface PlatformFunctionFragment extends Fragment {}
  interface UniNode extends React.ReactElement<any, any> {}
}
