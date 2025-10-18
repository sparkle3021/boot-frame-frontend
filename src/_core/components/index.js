/**
 * 核心组件导出
 */

import ProTable from './pro-table.vue'

// 组件列表
const components = [
  ProTable
]

// 批量注册组件
const install = (app) => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export {
  ProTable,
  install as default
}

