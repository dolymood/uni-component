import { h } from '@uni-component/core'
import { RichText } from '@uni-component/components'

export default function RichTextDemo () {
  const nodes = `
    <p>
      p content
      <strong>with</strong>
      <em>em</em>
      <span>and span tag</span>
    </p>
  `
  return (
    <RichText nodes={nodes}></RichText>
  )
}
