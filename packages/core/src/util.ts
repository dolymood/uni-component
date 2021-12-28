import { capitalize, camelize } from '@vue/shared'

export { camelize, capitalize }

export const normalized = (name: string) => {
  return capitalize(camelize(name))
}

export const inlineStyle2Obj = (str?: string) => {
  const obj: Record<string, string> = {}
  str && str.split(';').forEach((item) => {
    if (item) {
      const [k, v] = item.split(':')
      obj[k] = v
    }
  })
  return obj
}

export const equal = (a: any, b: any) => {
  let r = true
  for (const k in a) {
    if (a[k] !== b[k]) {
      r = false
      break
    }
  }
  return r
}
