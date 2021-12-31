import { h, uniComponent, uni2Platform, PropType } from '@uni-component/core'
import { View, Icon, Text } from '@uni-component/components'
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
    <View class='app-page'>
      <View class='app-page-header'>
        <Icon type='clear' onClick={state.onClose}></Icon>
        <Text class='app-page-title'>{ props.target.name }</Text>
      </View>
      <View class='app-page-main'>
        <View class='app-page-main-content'>
          <props.target.Demo />
        </View>
      </View>
    </View>
  )
}

export const Page = uni2Platform(UniPage)
