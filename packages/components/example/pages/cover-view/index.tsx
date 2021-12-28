import { h } from '@uni-component/core'
import { CoverView } from '@uni-component/components'

export default function CoverViewDemo () {
  return (
    <CoverView disabled={false} class="cover-view-demo">
      <p>
        <span>content</span>
        <strong>1</strong>
      </p>
      <CoverView class="cover-view-demo2">
        <p>content 2</p>
        <p>content 2 2</p>
      </CoverView>
    </CoverView>
  )
}
