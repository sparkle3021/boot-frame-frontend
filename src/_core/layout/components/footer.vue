<script setup>
// Footer组件
</script>

<template>
  <div class="app-footer">
    <div class="footer-content">
      <span>© 2024 管理系统 - All rights reserved</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-footer {
  height: 40px;
  width: 100%;
  background: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-light);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  
  .footer-content {
    color: var(--el-text-color-secondary);
    font-size: 12px;
    text-align: center;
  }
}
</style>