import { h, uniComponent, uni2Platform } from '@uni-component/core'

const UniLabel = uniComponent('uni-label', {
  for: String
}, () => {
  return {}
})

UniLabel.render = function (props, _, { renders }) {
  return (
    <label htmlFor={props.for}>
      { renders.defaultRender && renders.defaultRender() }
    </label>
  )
}

export const Label = uni2Platform(UniLabel)
