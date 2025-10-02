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

// 全屏状态
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

// 头部样式
const headerStyle = computed(() => ({
  height: `${layoutStore.headerHeight}px`
}))

// Logo尺寸（根据header高度的65%计算）
const logoSize = computed(() => Math.floor(layoutStore.headerHeight * 0.65))

// Logo样式
const logoStyle = computed(() => ({
  width: `${logoSize.value}px`,
  height: `${logoSize.value}px`
}))
</script>

<template>
  <div class="app-header" :style="headerStyle">
    <div class="header-content">
      <!-- Logo区域 -->
      <div v-if="layoutStore.showLogo" class="header-logo" @click="$router.push('/')">
        <img src="/favicon.ico" alt="logo" :style="logoStyle" />
        <span class="logo-title">管理系统</span>
      </div>
      
      <!-- 右侧操作区 -->
      <div class="header-actions">
        <!-- 搜索 -->
        <el-tooltip content="搜索" placement="bottom">
          <div class="icon-btn search-btn">
            <Icon icon="ep:search" :width="16" />
          </div>
        </el-tooltip>
        
        <!-- 通知 -->
        <el-tooltip content="消息通知" placement="bottom">
          <el-badge :value="12" :max="99" class="notification-badge">
            <div class="icon-btn">
              <Icon icon="ep:bell" :width="16" />
            </div>
          </el-badge>
        </el-tooltip>
        
        <!-- 全屏 -->
        <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
          <div class="icon-btn" @click="toggleFullscreen">
            <Icon :icon="isFullscreen ? 'ep:aim' : 'ep:full-screen'" :width="16" />
          </div>
        </el-tooltip>
        
        <!-- 主题切换 -->
        <el-tooltip :content="isDark ? '切换到亮色模式' : '切换到暗色模式'" placement="bottom">
          <div class="icon-btn" @click="toggleDark()">
            <Icon 
              :icon="isDark ? 'ep:sunny' : 'ep:moon'" 
              :width="16" 
            />
          </div>
        </el-tooltip>
        
        <!-- 分隔线 -->
        <el-divider direction="vertical" style="height: 20px;" />
        
        <!-- 用户菜单 -->
        <el-dropdown class="user-dropdown" trigger="click">
          <div class="user-info">
            <el-avatar 
              :size="28" 
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" 
            />
            <span class="username">管理员</span>
            <Icon icon="ep:arrow-down" :width="12" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <Icon icon="ep:user" :width="16" style="margin-right: 8px;" />
                个人中心
              </el-dropdown-item>
              <el-dropdown-item>
                <Icon icon="ep:setting" :width="16" style="margin-right: 8px;" />
                系统设置
              </el-dropdown-item>
              <el-dropdown-item divided>
                <Icon icon="ep:switch-button" :width="16" style="margin-right: 8px;" />
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-lighter);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  
  .header-content {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    max-width: 100%;
  }
  
  .header-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    margin-right: 20px;
    transition: opacity 0.3s;
    
    &:hover {
      opacity: 0.8;
    }
    
    img {
      object-fit: contain;
      transition: all 0.3s;
    }
    
    .logo-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--el-text-color-primary);
      white-space: nowrap;
    }
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 2px;
    margin-left: auto;
    
    .notification-badge {
      :deep(.el-badge__content) {
        transform: translateY(-50%) translateX(50%);
        height: 14px;
        line-height: 14px;
        padding: 0 4px;
        font-size: 10px;
      }
    }
  }
  
  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 4px;
    cursor: pointer;
    color: var(--el-text-color-regular);
    transition: all 0.3s;
    
    &:hover {
      background: var(--el-fill-color-light);
      color: var(--el-color-primary);
    }
    
    &:active {
      background: var(--el-fill-color);
    }
    
    &.search-btn {
      &:hover {
        color: var(--el-color-primary);
      }
    }
  }
  
  .user-dropdown {
    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        background: var(--el-fill-color-light);
      }
      
      .username {
        font-size: 13px;
        color: var(--el-text-color-primary);
        font-weight: 500;
        white-space: nowrap;
      }
      
      .el-icon {
        color: var(--el-text-color-secondary);
        transition: transform 0.3s;
      }
      
      &:hover .el-icon {
        transform: rotate(180deg);
      }
    }
  }
  
  :deep(.el-dropdown-menu__item) {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    
    &:hover {
      color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
    }
  }
  
  :deep(.el-divider--vertical) {
    margin: 0 8px;
    background-color: var(--el-border-color-lighter);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .app-header {
    .header-logo {
      .logo-title {
        display: none;
      }
    }
    
    .user-info {
      .username {
        display: none;
      }
    }
  }
}
</style>