import layoutConfig from '@/_core/layout/config.json'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  // 从配置文件加载静态配置
  const config = layoutConfig.layout
  
  // 侧边栏状态（唯一可动态变化的状态）
  const sidebarCollapsed = ref(false)
  
  // 静态配置项
  const sidebarWidth = ref(config.sidebarWidth)
  const collapsedWidth = ref(config.collapsedWidth)
  const headerHeight = ref(config.headerHeight)
  const showFooter = ref(config.showFooter)
  const showLogo = ref(config.showLogo)
  
  // 切换侧边栏折叠状态
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }
  
  // 设置侧边栏折叠状态
  const setSidebarCollapsed = (collapsed) => {
    sidebarCollapsed.value = collapsed
  }
  
  // 获取当前侧边栏宽度
  const getCurrentSidebarWidth = () => {
    return sidebarCollapsed.value ? collapsedWidth.value : sidebarWidth.value
  }
  
  return {
    // 状态
    sidebarCollapsed,
    sidebarWidth,
    collapsedWidth,
    headerHeight,
    showFooter,
    showLogo,
    
    // 方法
    toggleSidebar,
    setSidebarCollapsed,
    getCurrentSidebarWidth
  }
})
