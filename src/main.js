//=== 组件
import * as ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import plusZhCn from 'plus-pro-components/es/locale/lang/zh-cn'
import PlusProComponents from 'plus-pro-components'
import { createApp } from 'vue'
import router from './router'
import CoreComponents from './_core/components'
//=== vxe-table
import { vxeTableInit } from './_core/config/vxe-table'
import VxeUIAll, { VxeUI } from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'
import VxeUIPluginRenderElement from '@vxe-ui/plugin-render-element'
import '@vxe-ui/plugin-render-element/dist/style.css'

VxeUI.use(VxeUIPluginRenderElement)
//=== 样式
import 'element-plus/theme-chalk/src/index.scss'
import 'plus-pro-components/theme-chalk/index.css'
import '@/_core/assets/styles/layout/index.scss'
import 'virtual:uno.css'
import './_core/assets/styles/dark.scss'
import './_core/assets/styles/element-plus-theme/index.scss'
import './_core/assets/styles/index.scss'
import './_core/assets/styles/wait-loading.scss'
import 'vxe-table/lib/style.css'
//=== 入口
import App from './App.vue'

// 配置 VxeTable 全局设置
vxeTableInit()

const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus, {
  locale: { ...zhCn, ...plusZhCn },
})
app.use(PlusProComponents)
app.use(VxeUIAll)
app.use(VxeUITable)
app.use(CoreComponents)
app.use(router)
app.mount('#app')
