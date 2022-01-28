import {
  Fragment,
  ForwardRefRenderFunction,
  MemoExoticComponent,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes
} from 'react'

type FWC<P> = ForwardRefRenderFunction<T, P> & MemoExoticComponent<
  ForwardRefExoticComponent<
    PropsWithoutRef<P> & RefAttributes<T>
  >
>

declare module '@uni-component/core' {
  interface PlatformComponent<P> extends FWC<P, any> {}
  interface PlatformFragment extends Fragment {}
}
