<script setup>
import { useLayoutStore } from '@/stores/layout'
import { computed } from 'vue'
import AppFooter from './components/footer.vue'
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

// 主体区域高度(视口高度 - 头部 - 底部)
const bodyHeight = computed(() => {
  const footerHeight = layoutStore.showFooter ? layoutStore.footerHeight : 0
  return `calc(100vh - ${layoutStore.headerHeight}px - ${footerHeight}px)`
})

// 侧边栏样式
const sidebarStyle = computed(() => ({
  width: `${layoutStore.getCurrentSidebarWidth()}px`,
  top: headerHeight.value,
  height: `calc(100vh - ${layoutStore.headerHeight}px)`
}))

// 主内容和底部样式
const mainStyle = computed(() => getOffsetStyle())
const footerStyle = computed(() => getOffsetStyle())
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
    
    <div v-if="layoutStore.showFooter" class="layout-footer" :style="footerStyle">
      <AppFooter />
    </div>
  </div>
</template>