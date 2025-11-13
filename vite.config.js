import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    svgLoader({
      // Configuration for vite-svg-loader
      svgoConfig: {
        // Pass options directly to SVGO
        plugins: [
          // Disable the plugin responsible for ID renaming/minifying
          // {
          //   name: 'cleanupIds',
          //   active: false,
          // },
          // You might need to add other default plugins back if they were removed
          // or rely on SVGO's default preset.
          // Or, just use the 'preset-default' and disable only cleanupIDs
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupIds: false, // Disable ID cleanup within the default preset
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
