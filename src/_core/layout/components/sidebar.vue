<script setup>
import { useLayoutStore } from '@/stores/layout'
import { useRouterStore } from '@/stores/router'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const layoutStore = useLayoutStore()
const routerStore = useRouterStore()

const menuList = computed(() => routerStore.menus)

const handleMenuSelect = (path) => {
  router.push(path)
}

// 根据折叠状态动态调整图标大小
// collapsed=true(折叠) -> 大图标20px, collapsed=false(展开) -> 正常16px
const iconSize = computed(() => {
  return layoutStore.sidebarCollapsed ? 20 : 16
})
</script>

<template>
  <div class="app-sidebar">
    <el-scrollbar class="sidebar-scrollbar">
      <el-menu
        :default-active="$route.path"
        :collapse="layoutStore.sidebarCollapsed"
        :unique-opened="true"
        :collapse-transition="false"
        @select="handleMenuSelect"
      >
        <template v-for="item in menuList" :key="item.path">
          <el-menu-item
            v-if="!item.children || item.children.length === 0"
            :index="item.path"
          >
            <Icon v-if="item.icon" :icon="item.icon" :width="iconSize" class="menu-icon" />
            <template #title>{{ item.title }}</template>
          </el-menu-item>
          
          <el-sub-menu v-else :index="item.path">
            <template #title>
              <Icon v-if="item.icon" :icon="item.icon" :width="iconSize" class="menu-icon" />
              <span>{{ item.title }}</span>
            </template>
            
            <template v-for="child in item.children" :key="child.path">
              <el-menu-item
                v-if="!child.children || child.children.length === 0"
                :index="child.path"
              >
                <Icon v-if="child.icon" :icon="child.icon" :width="iconSize" class="menu-icon" />
                <template #title>{{ child.title }}</template>
              </el-menu-item>
              <el-sub-menu v-else :index="child.path">
                <template #title>
                  <Icon v-if="child.icon" :icon="child.icon" :width="iconSize" class="menu-icon" />
                  <span>{{ child.title }}</span>
                </template>
                
                <el-menu-item
                  v-for="grandChild in child.children"
                  :key="grandChild.path"
                  :index="grandChild.path"
                >
                  <Icon v-if="grandChild.icon" :icon="grandChild.icon" :width="iconSize" class="menu-icon" />
                  <template #title>{{ grandChild.title }}</template>
                </el-menu-item>
              </el-sub-menu>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
    
    <div class="sidebar-toggle" @click="layoutStore.toggleSidebar()">
      <Icon 
        :icon="layoutStore.sidebarCollapsed ? 'mdi:chevron-right' : 'mdi:chevron-left'" 
        width="14" 
      />
    </div>
  </div>
</template>