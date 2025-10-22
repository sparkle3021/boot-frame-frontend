<script setup>
/**
 * ProTable 组件
 * 结合 el-card 和 PlusTable，提供更好的背景样式
 * 完全兼容 PlusTable 的所有特性（包括 action-bar、插槽等）
 */
import { useAttrs, computed } from 'vue'

defineOptions({
  name: 'ProTable',
  inheritAttrs: false,
})

// Card 相关的 props
defineProps({
  // Card 阴影显示方式
  cardShadow: {
    type: String,
    default: 'never',
  },
  // Card body 的自定义样式
  cardBodyStyle: {
    type: Object,
    default: () => ({}),
  },
  // 是否显示 Card 包裹，设置为 false 时等同于直接使用 PlusTable
  showCard: {
    type: Boolean,
    default: true,
  },
})

// 获取所有属性
const attrs = useAttrs()

// 分离 class 和 style，应用到外层容器
const containerAttrs = computed(() => {
  const { class: className, style } = attrs
  return { class: className, style }
})

// 其他属性传递给 PlusTable
const tableAttrs = computed(() => {
  const { class: _, style: __, ...rest } = attrs
  return rest
})
</script>

<template>
  <el-card
    v-if="showCard"
    v-bind="containerAttrs"
    :shadow="cardShadow"
    :body-style="cardBodyStyle"
    class="pro-table-card"
  >
    <PlusTable
      v-bind="tableAttrs"
      :pagination="{
        pageSizeList: [10, 20, 50, 100],
      }"
    >
      <!-- 传递所有插槽 -->
      <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </PlusTable>
  </el-card>
  <PlusTable
    v-else
    v-bind="$attrs"
    :pagination="{
      pageSizeList: [10, 20, 50, 100],
    }"
  >
    <!-- 传递所有插槽 -->
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </PlusTable>
</template>

<style lang="scss" scoped>
.pro-table-card {
  :deep(.el-card__body) {
    padding-bottom: 0;
  }
}
</style>
