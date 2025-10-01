<script setup>
import { useLayoutStore } from '@/stores/layout'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const layoutStore = useLayoutStore()

// 标签页数据
const tabs = ref([
  { path: '/dashboard', title: '仪表盘', closable: false }
])
const activeTab = ref('/dashboard')
const cachedViews = ref(['Dashboard'])

// 主内容区样式
const mainStyle = computed(() => {
  const style = {
    padding: '20px',
    minHeight: 'calc(100vh - 120px)'
  }
  
  if (layoutStore.fixedHeader) {
    style.paddingTop = `${layoutStore.headerHeight + 20}px`
  }
  
  return style
})

// 是否显示面包屑
const showBreadcrumb = computed(() => {
  return layoutStore.showBreadcrumb
})

// 面包屑数据
const breadcrumbs = computed(() => {
  const matched = route.matched.filter(item => item.meta && item.meta.title)
  const breadcrumbList = matched.map(item => ({
    path: item.path,
    title: item.meta.title
  }))
  
  // 添加首页
  if (breadcrumbList.length > 0 && breadcrumbList[0].path !== '/dashboard') {
    breadcrumbList.unshift({ path: '/dashboard', title: '首页' })
  }
  
  return breadcrumbList
})

// 监听路由变化，更新标签页
watch(
  () => route.path,
  (newPath) => {
    activeTab.value = newPath
    
    // 添加新标签页
    if (!tabs.value.find(tab => tab.path === newPath)) {
      const title = route.meta?.title || '未命名页面'
      tabs.value.push({
        path: newPath,
        title,
        closable: newPath !== '/dashboard'
      })
    }
    
    // 添加到缓存
    const componentName = route.meta?.keepAlive
    if (componentName && !cachedViews.value.includes(componentName)) {
      cachedViews.value.push(componentName)
    }
  },
  { immediate: true }
)

// 处理标签页点击
const handleTabClick = (tab) => {
  router.push(tab.props.name)
}

// 移除标签页
const removeTab = (targetPath) => {
  const targetIndex = tabs.value.findIndex(tab => tab.path === targetPath)
  
  if (targetIndex === -1) return
  
  // 移除标签页
  tabs.value.splice(targetIndex, 1)
  
  // 移除缓存
  const componentName = router.getRoutes()
    .find(r => r.path === targetPath)?.meta?.keepAlive
  if (componentName) {
    const cacheIndex = cachedViews.value.indexOf(componentName)
    if (cacheIndex > -1) {
      cachedViews.value.splice(cacheIndex, 1)
    }
  }
  
  // 如果关闭的是当前标签页，需要跳转到其他标签页
  if (activeTab.value === targetPath) {
    const nextTab = tabs.value[targetIndex] || tabs.value[targetIndex - 1]
    if (nextTab) {
      router.push(nextTab.path)
    }
  }
}
</script>

<template>
  <div class="app-main" :style="mainStyle">
    <!-- 面包屑导航 -->
    <div v-if="showBreadcrumb" class="main-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in breadcrumbs"
          :key="item.path"
          :to="item.path"
        >
          {{ item.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <!-- 标签页导航 -->
    <div v-if="layoutStore.showTabs" class="main-tabs">
      <el-tabs
        v-model="activeTab"
        type="card"
        closable
        @tab-remove="removeTab"
        @tab-click="handleTabClick"
      >
        <el-tab-pane
          v-for="tab in tabs"
          :key="tab.path"
          :label="tab.title"
          :name="tab.path"
          :closable="tab.closable"
        />
      </el-tabs>
    </div>
    
    <!-- 页面内容 -->
    <div class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <component :is="Component" :key="route.path" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  background: var(--el-bg-color-page);
  min-height: 100vh;
  
  .main-breadcrumb {
    padding: 12px 0;
    border-bottom: 1px solid var(--el-border-color-lighter);
    margin-bottom: 16px;
  }
  
  .main-tabs {
    margin-bottom: 16px;
    
    :deep(.el-tabs__header) {
      margin: 0;
      
      .el-tabs__nav-wrap {
        &::after {
          display: none;
        }
      }
      
      .el-tabs__item {
        border: 1px solid var(--el-border-color-light);
        border-bottom: none;
        border-radius: 4px 4px 0 0;
        margin-right: 4px;
        
        &.is-active {
          background: var(--el-bg-color);
          border-color: var(--el-color-primary);
          color: var(--el-color-primary);
        }
        
        &:hover {
          color: var(--el-color-primary);
        }
      }
    }
    
    :deep(.el-tabs__content) {
      display: none;
    }
  }
  
  .main-content {
    background: var(--el-bg-color);
    border-radius: 6px;
    box-shadow: var(--el-box-shadow-lighter);
    min-height: 400px;
    overflow: hidden;
  }
}

// 页面切换动画
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>