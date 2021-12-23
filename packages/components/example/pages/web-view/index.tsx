import { h } from '@uni-component/core'
import { WebView } from '@uni-component/components'

export default function WebViewDemo () {
  return (
    <WebView src={location.href}></WebView>
  )
}
