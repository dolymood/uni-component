import { createElement, Fragment } from 'react'
import { camelize, setPlatform, UniNode } from '@uni-component/core'
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
  crossorigin: 'crossOrigin',
  novalidate: 'noValidate',
  srcset: 'srcSet'
}
const svgAttrs = [
  'accent-height',
  'alignment-baseline',
  'arabic-form',
  'baseline-shift',
  'cap-height',
  'clip-path',
  'clip-rule',
  'color-interpolation',
  'color-interpolation-filters',
  'color-profile',
  'color-rendering',
  'dominant-baseline',
  'enable-background',
  'fill-opacity',
  'fill-rule',
  'flood-color',
  'flood-opacity',
  'font-family',
  'font-size',
  'font-size-adjust',
  'font-stretch',
  'font-style',
  'font-variant',
  'font-weight',
  'glyph-name',
  'glyph-orientation-horizontal',
  'glyph-orientation-vertical',
  'horiz-adv-x',
  'horiz-origin-x',
  'image-rendering',
  'letter-spacing',
  'lighting-color',
  'marker-end',
  'marker-mid',
  'marker-start',
  'overline-position',
  'overline-thickness',
  'paint-order',
  'panose-1',
  'pointer-events',
  'shape-rendering',
  'stop-color',
  'stop-opacity',
  'strikethrough-position',
  'strikethrough-thickness',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-linecap',
  'stroke-linejoin',
  'stroke-miterlimit',
  'stroke-opacity',
  'stroke-width',
  'text-anchor',
  'text-decoration',
  'text-rendering',
  'underline-position',
  'underline-thickness',
  'unicode-bidi',
  'unicode-range',
  'unitsPer-em',
  'v-alphabetic',
  'vector-effect',
  'vert-adv-y',
  'vert-origin-x',
  'vert-origin-y',
  'v-hanging',
  'v-ideographic',
  'v-mathematical',
  'word-spacing',
  'writing-mode',
  'x-height'
]
svgAttrs.forEach((key) => {
  transformPropsMap[key] = camelize(key)
})
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
    return createElement(type, props, ...children) as UniNode
  }
})
