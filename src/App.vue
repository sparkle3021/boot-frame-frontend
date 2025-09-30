<script setup>
import { getPetInfo } from '@/api/demo'
import useFetch from '@/hooks/useFetch'
import { useDark, useToggle } from '@vueuse/core'
import { message } from '@/_core/utils/message'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const { data, loading, error, run } = useFetch(() => getPetInfo(1))

function showMessage() {
  message('一条提示消息')
}
</script>

<template>
  <el-button type="primary" @click="toggleDark(!isDark)">
    切换主题，当前主题：{{ isDark ? '暗黑' : '亮色' }}
  </el-button>
  <el-button @click="showMessage"> 显示消息 </el-button>

  <el-divider></el-divider>

  <!-- 接口调用测试 -->
  <el-button type="primary" @click="run">调用接口</el-button>
  <el-card v-loading="loading" style="max-width: 480px" class="mt-1rem">
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <pre>{{ data }}</pre>
    </div>
  </el-card>
</template>

<style scoped></style>
