import { inject } from '@uni-component/core'
import { FormProvide, formProvide } from './form'

export enum FieldType {
  checkbox = 'checkbox',
  radio = 'radio',
  input = 'input',
  textarea = 'textarea',
  switch = 'switch',
  slider = 'slider',
  picker = 'picker'
}

export const useField = (name: string, type: FieldType = FieldType.input) => {
  const form = inject<FormProvide>(formProvide)

  const setFormValue = (value: any) => {
    if (form) {
      const formValue = form.value.value
      const hash = form.hash

      switch (type) {
        case FieldType.radio:
          if (value !== undefined) {
            hash[name] = true
            formValue[name] = value
          } else {
            if (!hash[name]) {
              formValue[name] = ''
            }
          }
          break
        case FieldType.checkbox:
          if (value !== undefined) {
            if (hash[name]) {
              formValue[name].push(value)
            } else {
              hash[name] = true
              formValue[name] = [value]
            }
          } else {
            if (!hash[name]) {
              formValue[name] = []
            }
          }
          break
        default:
          formValue[name] = value  
      }
    }
  }

  return {
    setFormValue
  }
}
