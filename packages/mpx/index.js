'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/uni-component-mpx.prod.cjs')
} else {
  module.exports = require('./dist/uni-component-mpx.cjs')
}
