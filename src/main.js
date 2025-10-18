//=== 组件
import * as ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import plusZhCn from 'plus-pro-components/es/locale/lang/zh-cn'

import PlusProComponents from 'plus-pro-components'
import { createApp } from 'vue'
import router from './router'
import CoreComponents from './_core/components'
//=== 样式
import 'element-plus/theme-chalk/src/index.scss'
import 'plus-pro-components/theme-chalk/index.css'
import '@/_core/assets/styles/layout/index.scss'
import 'virtual:uno.css'
import './_core/assets/styles/dark.scss'
import './_core/assets/styles/element-plus-theme/index.scss'
import './_core/assets/styles/index.scss'
import './_core/assets/styles/wait-loading.scss'

//=== 入口
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus, {
  locale: { ...zhCn, ...plusZhCn },
})
app.use(PlusProComponents)
app.use(CoreComponents)
app.use(router)
app.mount('#app')
