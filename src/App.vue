<script setup>
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <el-button type="primary">Primary Button</el-button>
  <el-button @click="toggleDark(!isDark)">切换主题，当前主题：{{ isDark?"暗黑":"亮色" }}</el-button>
</template>

<style scoped></style>
