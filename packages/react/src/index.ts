import { createElement, Fragment } from 'react'
import { setPlatform } from '@uni-component/core'
import { uni2React } from './react'

export * from './react'

const transformPropsMap: Record<string, string> = {
  autocomplete: 'autoComplete',
  class: 'className',
  autoplay: 'autoPlay',
  minlength: 'minLength',
  maxlength: 'maxLength',
  autofocus: 'autoFocus',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  novalidate: 'noValidate',
  srcset: 'srcSet',
  ariaLabel: 'aria-label',
  ariaDisabled: 'aria-disabled',
  ariaCurrent: 'aria-current',
  'stroke-width': 'strokeWidth',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'inset-inline-start': 'insetInlineStart'
}
const transformProps = Object.keys(transformPropsMap)

setPlatform({
  Fragment,
  createComponent: uni2React,
  createVNode: function (type, props, children) {
    const isPlainNode = typeof type === 'string'
    isPlainNode && props && transformProps.forEach((key) => {
      if (props.hasOwnProperty(key)) {
        props[transformPropsMap[key]] = props[key]
        delete props[key]
      }
    })
    return createElement(type, props, ...children)
  }
})  
