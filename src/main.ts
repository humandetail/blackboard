import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .mount('#app')
