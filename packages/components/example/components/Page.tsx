import { h, uniComponent, uni2Platform, PropType } from '@uni-component/core'
import './Page.scss'

interface Item {
  name: string,
  Demo: Function
}

const UniPage = uniComponent('uni-page', {
  target: {
    type: Object as PropType<Item>,
    default: {},
    required: true
  },
  onClose: Function
}, (_, props) => {
  const onClose = () => {
    props.onClose && props.onClose()
  }
  return {
    onClose
  }
})

UniPage.render = function (props, state) {
  return (
    <div class='app-page' onScroll={(e) => e.stopPropagation()}>
      <header class='app-page-header'>
        <i class='weui-icon-clear' onClick={state.onClose}></i>
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

export const Page = uni2Platform(UniPage)
