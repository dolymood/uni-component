import { h, uniComponent, uni2Platform, PropType } from '@uni-component/core'
import { View } from '@uni-component/components'

export interface Item {
  name: string,
  Demo?: Function
}

const UniAppItem = uniComponent('uni-app-item', {
  item: {
    type: Object as PropType<Item>,
    required: true
  },
  onClick: Function as PropType<(item: Item) => void>
}, (_, props) => {
  const rootClass = `weui-cell${props.item.Demo ? ' weui-cell_access' : ''}`
  const onClick = () => {
    props.onClick && props.onClick(props.item)
  }
  return {
    rootClass,
    onClick
  }
})

export const Item = uni2Platform(UniAppItem, (props, state) => {
  const item = props.item
  const { rootClass, onClick } = state
  return (
    <View class={rootClass} onClick={onClick}>
      <View class='weui-cell__bd'>
        {item.name}
      </View>
      {item.Demo ? <View class='weui-cell__ft'>{item.name}</View> : undefined}
    </View>
  )
})
