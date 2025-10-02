<script setup>
import { useLayoutStore } from '@/stores/layout'
import { Icon } from '@iconify/vue'
import { useDark, useFullscreen, useToggle } from '@vueuse/core'
import { computed } from 'vue'

const layoutStore = useLayoutStore()

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { isFullscreen, toggle: toggleFullscreen } = useFullscreen()

// Logo尺寸根据header高度动态计算
const logoSize = computed(() => Math.floor(layoutStore.headerHeight * 0.65))

// Header高度
const headerHeight = computed(() => `${layoutStore.headerHeight}px`)
</script>

<template>
  <div class="app-header" :style="{ height: headerHeight }">
    <div class="header-content">
      <div v-if="layoutStore.showLogo" class="header-logo" @click="$router.push('/')">
        <img 
          src="/favicon.ico" 
          alt="logo" 
          :style="{ width: `${logoSize}px`, height: `${logoSize}px` }" 
        />
        <span class="logo-title">管理系统</span>
      </div>
      
      <div class="header-actions">
        <el-tooltip content="搜索" placement="bottom">
          <div class="icon-btn">
            <Icon icon="ep:search" :width="16" />
          </div>
        </el-tooltip>
        
        <el-tooltip content="消息通知" placement="bottom">
          <el-badge :value="12" :max="99" class="notification-badge">
            <div class="icon-btn">
              <Icon icon="ep:bell" :width="16" />
            </div>
          </el-badge>
        </el-tooltip>
        
        <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
          <div class="icon-btn" @click="toggleFullscreen">
            <Icon :icon="isFullscreen ? 'ep:aim' : 'ep:full-screen'" :width="16" />
          </div>
        </el-tooltip>
        
        <el-tooltip :content="isDark ? '切换到亮色模式' : '切换到暗色模式'" placement="bottom">
          <div class="icon-btn" @click="toggleDark()">
            <Icon :icon="isDark ? 'ep:sunny' : 'ep:moon'" :width="16" />
          </div>
        </el-tooltip>
        
        <el-divider direction="vertical" style="height: 20px;" />
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