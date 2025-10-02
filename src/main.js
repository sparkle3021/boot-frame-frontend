//=== 组件
import * as ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from './router'
//=== 样式
import '@/_core/assets/styles/layout/index.scss'
import 'element-plus/theme-chalk/src/index.scss'
import 'virtual:uno.css'
import './_core/assets/styles/dark.scss'
import './_core/assets/styles/element-plus-theme/index.scss'
import './_core/assets/styles/index.scss'
import './_core/assets/styles/wait-loading.scss'

//=== 入口
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.mount('#app')
