<script setup>
/**
 * ProTable 组件
 * 结合 el-card 和 PlusTable，提供更好的背景样式
 * 完全兼容 PlusTable 的所有特性（包括 action-bar、插槽等）
 */

defineOptions({
  name: 'ProTable',
  inheritAttrs: false
})

// Card 相关的 props
defineProps({
  // Card 阴影显示方式
  cardShadow: {
    type: String,
    default: 'never'
  },
  // Card body 的自定义样式
  cardBodyStyle: {
    type: Object,
    default: () => ({})
  },
  // 是否显示 Card 包裹，设置为 false 时等同于直接使用 PlusTable
  showCard: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <el-card
    v-if="showCard"
    :shadow="cardShadow"
    :body-style="cardBodyStyle"
    class="pro-table-card"
  >
    <PlusTable v-bind="$attrs">
      <slot />
    </PlusTable>
  </el-card>
  <PlusTable v-else v-bind="$attrs">
    <slot />
  </PlusTable>
</template>

<style lang="scss" scoped>
.pro-table-card {
  :deep(.el-card__body) {
    padding-bottom: 0;
  }
}
</style>
