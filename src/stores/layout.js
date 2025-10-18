import layoutConfig from '@/_core/layout/config.json'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLayoutStore = defineStore('layout', () => {
  const config = layoutConfig.layout
  
  // 动态状态
  const sidebarCollapsed = ref(false)
  
  // 静态配置
  const sidebarWidth = ref(config.sidebarWidth)
  const collapsedWidth = ref(config.collapsedWidth)
  const headerHeight = ref(config.headerHeight)
  const showLogo = ref(config.showLogo)
  
  // 切换侧边栏状态
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }
  
  // 设置侧边栏状态
  const setSidebarCollapsed = (collapsed) => {
    sidebarCollapsed.value = collapsed
  }
  
  // 获取当前侧边栏宽度
  const getCurrentSidebarWidth = () => {
    return sidebarCollapsed.value ? collapsedWidth.value : sidebarWidth.value
  }
  
  return {
    sidebarCollapsed,
    sidebarWidth,
    collapsedWidth,
    headerHeight,
    showLogo,
    toggleSidebar,
    setSidebarCollapsed,
    getCurrentSidebarWidth
  }
})
