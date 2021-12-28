'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/uni-component-components.prod.cjs')
} else {
  module.exports = require('./dist/uni-component-components.cjs')
}
