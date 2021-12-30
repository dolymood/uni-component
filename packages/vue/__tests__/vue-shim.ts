import { Fragment, jsx as _jsx } from 'vue-jsx-runtime'

const jsx = function (type: any, config: any = {}, ...children: any[]) {
  return _jsx(type, {
    ...config,
    children: children
  })
}

export { Fragment, jsx }
