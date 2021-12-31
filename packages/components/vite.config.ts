import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
      babel: {
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            {
              "throwIfNamespace": false,
              "runtime": "classic",
              "pragma": "h"
            }
          ]
        ]
      }
    })
  ],
  build: {
    minify: false
  },
  resolve: {
    alias: {
      '@uni-component/core': path.resolve(__dirname, '../core/src'),
      '@uni-component/react': path.resolve(__dirname, '../react/src'),
      '@uni-component/vue': path.resolve(__dirname, '../vue/src'),
      '@uni-component/components': path.resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss']
  }
})
