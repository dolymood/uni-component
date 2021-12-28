import { h, uniComponent, uni2Platform } from '@uni-component/core'

const UniLabel = uniComponent('uni-label', {
  for: String
}, () => {
  return {}
})

UniLabel.render = function (props, _, { slots }) {
  return (
    <label htmlFor={props.for}>
      { slots.default && slots.default() }
    </label>
  )
}

export const Label = uni2Platform(UniLabel)
