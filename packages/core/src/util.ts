import { capitalize, camelize } from '@vue/shared'

export const normalized = (name: string) => {
  return capitalize(camelize(name))
}
