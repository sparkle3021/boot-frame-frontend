<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

// 主题模式
const isDark = useDark()
const toggleDark = useToggle(isDark)

// 主题表单数据
const themeForm = ref({
  themeMode: isDark.value ? 'dark' : 'light',
  themeColor: '#409eff'
})

// 主题表单配置
const themeColumns = [
  {
    label: '主题模式',
    prop: 'themeMode',
    valueType: 'radio',
    options: [
      { label: '亮色', value: 'light' },
      { label: '暗色', value: 'dark' }
    ]
  },
  {
    label: '主题色',
    prop: 'themeColor',
    valueType: 'color',
    renderField: () => {
      return {
        tag: 'el-tag',
        props: { type: 'info' },
        children: '使用 Element Plus 默认主题色'
      }
    }
  }
]

// 布局信息配置
const layoutColumns = [
  {
    label: '布局类型',
    prop: 'layoutType'
  },
  {
    label: '配置方式',
    prop: 'configMethod'
  },
  {
    label: '配置文件',
    prop: 'configFile'
  }
]

// 布局信息数据
const layoutData = ref({
  layoutType: '混合布局',
  configMethod: '静态配置文件',
  configFile: 'src/_core/layout/config.json'
})

// 处理主题变化
const handleThemeChange = () => {
  const mode = themeForm.value.themeMode
  if (mode === 'light') {
    if (isDark.value) toggleDark()
  } else if (mode === 'dark') {
    if (!isDark.value) toggleDark()
  }
  ElMessage.success(`已切换到${mode === 'dark' ? '暗色' : '亮色'}主题`)
}

// 监听主题模式变化
const handleValuesChange = (values) => {
  if ('themeMode' in values) {
    handleThemeChange()
  }
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
          
          <PlusForm
            v-model="themeForm"
            :columns="themeColumns"
            label-width="100px"
            :rules="{}"
            :hasFooter="false"
            @values-change="handleValuesChange"
          />
        </el-card>
      </el-col>
      
      <!-- 布局信息 -->
      <el-col :xs="24" :lg="12">
        <el-card>
          <template #header>
            <span>布局信息</span>
          </template>
          
          <PlusDescriptions
            :columns="layoutColumns"
            :data="layoutData"
            :column="1"
            border
          />
          
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
