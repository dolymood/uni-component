import { h } from '@uni-component/core'
import { FunctionComponent } from 'react'
import './Page.scss'

interface Item {
  name: string,
  Demo: FunctionComponent<any>
}

interface Props {
  target: Item
  onClose: () => void
}

export const Page: FunctionComponent<Props> = (props) => {
  return (
    <div class='app-page' onScroll={(e) => e.stopPropagation()}>
      <header class='app-page-header'>
        <i class='weui-icon-clear' onClick={props.onClose}></i>
        <h2>{ props.target.name }</h2>
      </header>
      <main class='app-page-main'>
        <div class='app-page-main-content'>
          <props.target.Demo />
        </div>
      </main>
    </div>
  )
}
