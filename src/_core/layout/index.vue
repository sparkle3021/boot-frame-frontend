<script setup>
import { useLayoutStore } from '@/stores/layout'
import { computed } from 'vue'
import AppFooter from './components/footer.vue'
import AppHeader from './components/header.vue'
import AppMain from './components/main.vue'
import AppSidebar from './components/sidebar.vue'

const layoutStore = useLayoutStore()

// 头部样式
const headerStyle = computed(() => ({
  height: `${layoutStore.headerHeight}px`,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000
}))

// 主体区域样式
const bodyStyle = computed(() => ({
  marginTop: `${layoutStore.headerHeight}px`,
  height: `calc(100vh - ${layoutStore.headerHeight}px - ${layoutStore.showFooter ? 40 : 0}px)`
}))

// 侧边栏样式
const sidebarStyle = computed(() => ({
  width: `${layoutStore.getCurrentSidebarWidth()}px`,
  top: `${layoutStore.headerHeight}px`,
  height: `calc(100vh - ${layoutStore.headerHeight}px)`,
  transition: 'width 0.3s ease'
}))

// 主内容区域样式
const mainStyle = computed(() => ({
  marginLeft: `${layoutStore.getCurrentSidebarWidth()}px`,
  width: `calc(100% - ${layoutStore.getCurrentSidebarWidth()}px)`,
  transition: 'margin-left 0.3s ease, width 0.3s ease'
}))

// Footer样式（需要避开侧边栏）
const footerStyle = computed(() => ({
  marginLeft: `${layoutStore.getCurrentSidebarWidth()}px`,
  width: `calc(100% - ${layoutStore.getCurrentSidebarWidth()}px)`,
  transition: 'margin-left 0.3s ease, width 0.3s ease'
}))
</script>

<template>
  <div class="app-layout">
    <!-- 顶部头部 -->
    <div class="layout-header" :style="headerStyle">
      <AppHeader />
    </div>
    
    <!-- 主体区域 -->
    <div class="layout-body" :style="bodyStyle">
      <!-- 侧边栏 -->
      <div class="layout-sidebar" :style="sidebarStyle">
        <AppSidebar />
      </div>
      
      <!-- 内容区域 -->
      <div class="layout-main" :style="mainStyle">
        <AppMain />
      </div>
    </div>
    
    <!-- 页脚 -->
    <div v-if="layoutStore.showFooter" class="layout-footer" :style="footerStyle">
      <AppFooter />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  .layout-header {
    flex-shrink: 0;
  }
  
  .layout-body {
    display: flex;
    overflow: hidden;
    
    .layout-sidebar {
      position: fixed;
      left: 0;
      z-index: 999;
      background: var(--el-bg-color);
      box-shadow: var(--el-box-shadow-light);
    }
    
    .layout-main {
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }
  }
  
  .layout-footer {
    flex-shrink: 0;
  }
}
</style>