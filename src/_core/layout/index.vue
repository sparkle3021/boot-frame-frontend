<script setup>
import { useLayoutStore } from '@/stores/layout'
import { computed } from 'vue'
import AppHeader from './components/header.vue'
import AppMain from './components/main.vue'
import AppSidebar from './components/sidebar.vue'

const layoutStore = useLayoutStore()

// 计算避开侧边栏的偏移样式
const getOffsetStyle = () => {
  const sidebarWidth = layoutStore.getCurrentSidebarWidth()
  return {
    marginLeft: `${sidebarWidth}px`,
    width: `calc(100% - ${sidebarWidth}px)`,
    transition: 'margin-left 0.3s ease, width 0.3s ease'
  }
}

// 头部固定高度
const headerHeight = computed(() => `${layoutStore.headerHeight}px`)

// 主体区域高度(视口高度 - 头部)
const bodyHeight = computed(() => {
  return `calc(100vh - ${layoutStore.headerHeight}px)`
})

// 侧边栏样式
const sidebarStyle = computed(() => ({
  width: `${layoutStore.getCurrentSidebarWidth()}px`,
  top: headerHeight.value,
  height: `calc(100vh - ${layoutStore.headerHeight}px)`
}))

// 主内容样式
const mainStyle = computed(() => getOffsetStyle())
</script>

<template>
  <div class="app-layout">
    <div class="layout-header">
      <AppHeader />
    </div>
    
    <div class="layout-body" :style="{ marginTop: headerHeight, height: bodyHeight }">
      <div class="layout-sidebar" :style="sidebarStyle">
        <AppSidebar />
      </div>
      
      <div class="layout-main" :style="mainStyle">
        <AppMain />
      </div>
    </div>
  </div>
</template>