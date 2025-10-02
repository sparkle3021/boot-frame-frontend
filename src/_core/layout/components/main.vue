<script setup>
import { computed } from 'vue';

// 主内容区样式
const mainStyle = computed(() => ({
  padding: '20px'
}))
</script>

<template>
  <div class="app-main" :style="mainStyle">
    <!-- 页面内容 -->
    <div class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  background: var(--el-bg-color-page);
  min-height: 100vh;
  
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