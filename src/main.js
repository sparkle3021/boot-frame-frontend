//=== 组件
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlus from 'element-plus'
import router from './router'
//=== 样式
import 'element-plus/theme-chalk/src/index.scss'
import './_core/assets/styles/element-plus-theme/index.scss'
import './_core/assets/styles/dark.scss'
import './_core/assets/styles/index.scss'

//=== 入口
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.mount('#app')
