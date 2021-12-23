import { h } from '@uni-component/core'
import { View } from '@uni-component/components'

export default function ViewDemo () {
  return (
    <View disabled={false} class="view-demo">
      <p>
        <span>content</span>
        <strong>1</strong>
      </p>
      <View class="view-demo2">
        <p>content 2</p>
        <p>content 2 2</p>
      </View>
    </View>
  )
}
