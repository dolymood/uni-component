import { capitalize, camelize } from '@vue/shared'

export const normalized = (name: string) => {
  return capitalize(camelize(name))
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
