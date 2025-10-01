<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

// 主题模式
const isDark = useDark()
const toggleDark = useToggle(isDark)
const themeMode = ref(isDark.value ? 'dark' : 'light')

// 处理主题变化
const handleThemeChange = (mode) => {
  if (mode === 'light') {
    if (isDark.value) toggleDark()
  } else if (mode === 'dark') {
    if (!isDark.value) toggleDark()
  }
  themeMode.value = mode
  ElMessage.success(`已切换到${mode === 'dark' ? '暗色' : '亮色'}主题`)
}
</script>

<template>
  <div class="system-config">
    <div class="page-header">
      <h3>系统设置</h3>
    </div>
    
    <el-row :gutter="20">
      <!-- 主题设置 -->
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <span>主题设置</span>
          </template>
          
          <el-form label-width="120px">
            <el-form-item label="主题模式">
              <el-radio-group v-model="themeMode" @change="handleThemeChange">
                <el-radio value="light">亮色</el-radio>
                <el-radio value="dark">暗色</el-radio>
              </el-radio-group>
            </el-form-item>
            
            <el-form-item label="主题色">
              <el-tag type="info">使用 Element Plus 默认主题色</el-tag>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      
      <!-- 布局信息 -->
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <span>布局信息</span>
          </template>
          
          <el-descriptions :column="1" border>
            <el-descriptions-item label="布局类型">混合布局</el-descriptions-item>
            <el-descriptions-item label="配置方式">静态配置文件</el-descriptions-item>
            <el-descriptions-item label="配置文件">src/_core/layout/config.json</el-descriptions-item>
          </el-descriptions>
          
          <el-alert
            type="info"
            :closable="false"
            style="margin-top: 16px"
          >
            <template #title>
              布局配置说明
            </template>
            <div style="font-size: 13px; line-height: 1.8;">
              布局参数通过配置文件管理，如需修改请编辑 config.json 文件后重启应用。
            </div>
          </el-alert>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.system-config {
  padding: 20px;
  
  .page-header {
    margin-bottom: 20px;
    
    h3 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
    }
  }
}
</style>
