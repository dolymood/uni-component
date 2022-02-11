import { toRaw } from '@uni-store/core'
import { capitalize, camelize, hyphenate } from '@vue/shared'

export { camelize, capitalize, hyphenate }

export const normalized = (name: string) => {
  return capitalize(camelize(name))
}

export const inlineStyle2Obj = (str?: string) => {
  const obj: Record<string, string> = {}
  str && str.split(';').forEach((item) => {
    item = item && item.trim()
    if (item) {
      const [k, v] = item.split(':')
      obj[k.trim()] = v.trim()
    }
  })
  return obj
}

export const mergeStyle = (...styles: any[]) => {
  return styles.reduce((style, val) => {
    if (val) {
      if (typeof val === 'string') {
        val = inlineStyle2Obj(val)
      }
      Object.assign(style, val)
    }
    return style
  }, {} as Record<string, any>)
}

export const equal = (a: any, b: any) => {
  a = toRaw(a)
  b = toRaw(b)
  let r = true
  for (const k in a) {
    if (toRaw(a[k]) !== toRaw(b[k])) {
      r = false
      break
    }
  }
  return r
}
