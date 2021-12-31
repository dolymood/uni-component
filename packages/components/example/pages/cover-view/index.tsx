import { h } from '@uni-component/core'
import { CoverView, View, Text } from '@uni-component/components'

export default function CoverViewDemo () {
  return (
    <CoverView disabled={false} class="cover-view-demo">
      <View>
        <View>
          <Text>content</Text>
        </View>
        <Text>1</Text>
      </View>
      <CoverView class="cover-view-demo2">
        <Text>content 2</Text>
        <Text>content 2 2</Text>
      </CoverView>
    </CoverView>
  )
}
