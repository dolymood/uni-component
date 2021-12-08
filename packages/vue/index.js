'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/uni-component-vue.prod.cjs')
} else {
  module.exports = require('./dist/uni-component-vue.cjs')
}
