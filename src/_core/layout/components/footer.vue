<script setup>
import { useLayoutStore } from '@/stores/layout';

const layoutStore = useLayoutStore()
</script>

<template>
  <div class="app-footer" :style="{ height: `${layoutStore.footerHeight}px` }">
    <span>© 2024 管理系统 - All rights reserved</span>
  </div>
</template>