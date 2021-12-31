import { h } from '@uni-component/core'
import { Block, View, Text } from '@uni-component/components'

export default function BlockDemo () {
  return (
    <Block>
      <View>
        <Text>block content</Text>
      </View>
      <Text>block content2</Text>
    </Block>
  )
}
