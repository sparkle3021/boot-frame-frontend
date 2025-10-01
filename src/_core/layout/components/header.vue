<script setup>
import { useLayoutStore } from '@/stores/layout'
import { Icon } from '@iconify/vue'
import { useDark, useFullscreen, useToggle } from '@vueuse/core'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const layoutStore = useLayoutStore()

// 主题切换
const isDark = useDark()
const toggleDark = useToggle(isDark)

// 全屏
const { toggle: toggleFullscreen } = useFullscreen()

// 头部样式
const headerStyle = computed(() => ({
  height: `${layoutStore.headerHeight}px`,
  position: layoutStore.fixedHeader ? 'fixed' : 'static',
  top: layoutStore.fixedHeader ? 0 : 'auto',
  zIndex: layoutStore.fixedHeader ? 1000 : 'auto',
  width: '100%'
}))


</script>

<template>
  <div class="app-header" :style="headerStyle">
    <!-- Logo区域 -->
    <div class="app-logo" @click="$router.push('/')">
      <img src="/favicon.ico" alt="logo" />
      <span>管理系统</span>
    </div>
    
    
    <!-- 右侧操作区 -->
    <div class="header-actions">
      <!-- 侧边栏折叠按钮 -->
       <el-button
         type="text"
         class="collapse-btn"
         @click="layoutStore.toggleSidebar()"
       >
         <Icon 
           :icon="layoutStore.sidebarCollapsed ? 'mdi:menu-open' : 'mdi:menu'" 
           width="16" 
         />
       </el-button>
      
      
      
       <!-- 主题切换 -->
       <el-button type="text" class="action-btn" @click="toggleDark()">
         <Icon 
           :icon="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" 
           width="16" 
         />
         <span>{{ isDark ? '亮色' : '暗色' }}</span>
       </el-button>
      
       <!-- 全屏 -->
       <el-button type="text" class="action-btn" @click="toggleFullscreen">
         <Icon icon="mdi:fullscreen" width="16" />
         <span>全屏</span>
       </el-button>
      
      <!-- 用户菜单 -->
      <el-dropdown class="user-dropdown">
         <div class="user-info">
           <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
           <span class="username">管理员</span>
           <Icon icon="mdi:chevron-down" width="16" />
         </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>系统设置</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: var(--el-color-primary);
  box-shadow: var(--el-box-shadow-lighter);
  color: #fff;
  
  .app-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    
    img {
      width: 32px;
      height: 32px;
      filter: brightness(0) invert(1);
    }
  }
  
  .header-nav {
    flex: 1;
    
    :deep(.el-menu) {
      border-bottom: none;
      
      .el-menu-item {
        border-bottom: 2px solid transparent;
        
        &:hover,
        &.is-active {
          background-color: rgba(255, 255, 255, 0.1);
          border-bottom-color: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: auto;
    
    .collapse-btn,
    .action-btn {
      color: #fff;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
    
    .breadcrumb {
      :deep(.el-breadcrumb__inner) {
        color: rgba(255, 255, 255, 0.8);
        
        &.is-link:hover {
          color: #fff;
        }
      }
      
      :deep(.el-breadcrumb__separator) {
        color: rgba(255, 255, 255, 0.6);
      }
    }
    
    .layout-switcher,
    .user-dropdown {
      .el-button {
        color: #fff;
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .username {
        font-size: 14px;
      }
    }
  }
}
</style>