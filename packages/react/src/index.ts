import { createElement, useCallback } from 'react'
import { setPlatform } from '@uni-component/core'
import { uni2React } from './react'

export * from './react'

let isRenderingSlot = false
const transformPropsMap: Record<string, string> = {
  class: 'className',
  // autoplay: 'autoPlay',
  // maxlength:'maxLength',
  // autofocus: 'autoFocus'
}
const transformProps = Object.keys(transformPropsMap)

setPlatform({
  createComponent: uni2React,
  createVNode: function (type, props, children) {
    transformProps.forEach((key) => {
      if (props.hasOwnProperty(key)) {
        props[transformPropsMap[key]] = props[key]
        delete props[key]
      }
    })
    if (children && children.length) {
      let i = children.length - 1
      while (i >= 0) {
        const child = children[i]
        if (child && child.props && child.props.slot) {
          if (!isRenderingSlot) {
            if (!props.slots) {
              props.slots = {}
            }
            props.slots[child.props.slot] = () => {
              isRenderingSlot = true
              return child
            }
            children.splice(i, 1)
          } else {
            isRenderingSlot = false
          }
        }
        i--
      }
    }
    return createElement(type, props, ...children)
  }
})
