<script setup>
import { useLayoutStore } from '@/stores/layout'
import { useRouterStore } from '@/stores/router'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const layoutStore = useLayoutStore()
const routerStore = useRouterStore()

// 侧边栏样式
const sidebarStyle = computed(() => ({
  width: `${layoutStore.getCurrentSidebarWidth()}px`,
  transform: 'translateX(0)',
  transition: 'width 0.3s ease'
}))

// 从路由 store 获取自动生成的菜单数据
const menuList = computed(() => routerStore.menus)

// 处理菜单选择
const handleMenuSelect = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="app-sidebar" :style="sidebarStyle">
    <!-- 菜单 -->
    <el-scrollbar class="sidebar-scrollbar">
      <el-menu
        :default-active="$route.path"
        :collapse="layoutStore.sidebarCollapsed"
        :unique-opened="true"
        :collapse-transition="false"
        @select="handleMenuSelect"
      >
        <template v-for="item in menuList" :key="item.path">
          <!-- 单级菜单 -->
           <el-menu-item
             v-if="!item.children || item.children.length === 0"
             :index="item.path"
           >
             <Icon v-if="item.icon" :icon="item.icon" width="16" class="menu-icon" />
             <template #title>{{ item.title }}</template>
           </el-menu-item>
          
          <!-- 多级菜单 -->
          <el-sub-menu v-else :index="item.path">
            <template #title>
              <Icon v-if="item.icon" :icon="item.icon" width="16" class="menu-icon" />
              <span>{{ item.title }}</span>
            </template>
            
            <template v-for="child in item.children" :key="child.path">
              <!-- 二级菜单 -->
              <el-menu-item
                v-if="!child.children || child.children.length === 0"
                :index="child.path"
              >
                <Icon v-if="child.icon" :icon="child.icon" width="16" class="menu-icon" />
                <template #title>{{ child.title }}</template>
              </el-menu-item>
              
              <!-- 三级菜单 -->
              <el-sub-menu v-else :index="child.path">
                <template #title>
                  <Icon v-if="child.icon" :icon="child.icon" width="16" class="menu-icon" />
                  <span>{{ child.title }}</span>
                </template>
                
                <el-menu-item
                  v-for="grandChild in child.children"
                  :key="grandChild.path"
                  :index="grandChild.path"
                >
                  <Icon v-if="grandChild.icon" :icon="grandChild.icon" width="16" class="menu-icon" />
                  <template #title>{{ grandChild.title }}</template>
                </el-menu-item>
              </el-sub-menu>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
    
    <!-- 折叠按钮 -->
    <div class="sidebar-toggle" @click="layoutStore.toggleSidebar()">
      <Icon 
        :icon="layoutStore.sidebarCollapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'" 
        width="14" 
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-sidebar {
  position: relative;
  height: 100%;
  background: var(--el-bg-color);
  border-right: 1px solid var(--el-border-color-light);
  display: flex;
  flex-direction: column;
  
  .sidebar-scrollbar {
    flex: 1;
    
    :deep(.el-scrollbar__view) {
      height: 100%;
    }
    
    :deep(.el-menu) {
      border-right: none;
      height: 100%;
      
      .el-menu-item,
      .el-sub-menu__title {
        height: 48px;
        line-height: 48px;
        
        &:hover {
          background-color: var(--el-menu-hover-bg-color);
        }
        
        &.is-active {
          background-color: var(--el-color-primary-light-9);
          color: var(--el-color-primary);
          
          &::before {
            content: '';
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 3px;
            background-color: var(--el-color-primary);
          }
        }
      }
      
      .el-sub-menu {
        .el-menu-item {
          padding-left: 50px !important;
          
          &.is-active {
            background-color: var(--el-color-primary-light-9);
            color: var(--el-color-primary);
          }
        }
        
        .el-sub-menu {
          .el-menu-item {
            padding-left: 70px !important;
          }
        }
      }
      
      &.el-menu--collapse {
        .el-menu-item,
        .el-sub-menu__title {
          padding: 0 20px;
          text-align: center;
          
          .menu-icon {
            margin-right: 0 !important;
          }
        }
      }
    }
  }
  
  // 菜单图标间距
  .menu-icon {
    margin-right: 12px;
    vertical-align: middle;
    display: inline-block;
  }
  
  .sidebar-toggle {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--el-bg-color-page);
    border: 1px solid var(--el-border-color-light);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: var(--el-color-primary-light-9);
      border-color: var(--el-color-primary);
      color: var(--el-color-primary);
    }
    
    .el-icon {
      font-size: 14px;
    }
  }
}
</style>