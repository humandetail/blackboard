import { resolve } from 'path'
import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
    base: env.VITE_APP_PATHNAME,

    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/
        ],
        imports: [
          'vue'
        ],
        dirs: [
          './src/composables'
        ],
        eslintrc: {
          enabled: true
        }
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            resolveIcons: true,
            importStyle: false
          })
        ]
      })
    ],

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})
