import { createElement } from 'react'
import { setPlatform } from '@uni-component/core'
import { uni2React } from './react'

export * from './react'

const transformPropsMap: Record<string, string> = {
  class: 'className',
  autoplay: 'autoPlay',
  maxlength:'maxLength',
  autofocus: 'autoFocus'
}
const transformProps = Object.keys(transformPropsMap)

export const initPlatform = () => {
  setPlatform({
    createComponent: uni2React,
    createVNode: function (type, props, children) {
      const isPlainNode = typeof type === 'string'
      isPlainNode && transformProps.forEach((key) => {
        if (props.hasOwnProperty(key)) {
          props[transformPropsMap[key]] = props[key]
          delete props[key]
        }
      })
      return createElement(type, props, ...children)
    }
  })  
}
