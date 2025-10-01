<script setup>
// Footer组件不需要额外的逻辑
</script>

<template>
  <div class="app-footer">
    <div class="footer-content">
      <div class="footer-left">
        <span>© 2024 管理系统. All rights reserved.</span>
      </div>
      <div class="footer-right">
        <span>Version 1.0.0</span>
        <el-divider direction="vertical" />
        <el-link href="#" type="primary">帮助文档</el-link>
        <el-divider direction="vertical" />
        <el-link href="#" type="primary">技术支持</el-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-footer {
  height: 60px;
  background: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-light);
  display: flex;
  align-items: center;
  padding: 0 20px;
  
  .footer-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .footer-left {
      color: var(--el-text-color-regular);
      font-size: 14px;
    }
    
    .footer-right {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--el-text-color-regular);
      font-size: 14px;
      
      .el-link {
        font-size: 14px;
      }
    }
  }
}
</style>