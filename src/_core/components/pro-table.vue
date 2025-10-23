<script setup>
/**
 * ProTable 组件
 * 结合 el-card 和 VxeGrid，提供更好的背景样式
 * 完全兼容 VxeGrid 的所有特性（包括工具栏、插槽等）
 */
import { useAttrs, computed, ref } from 'vue'

defineOptions({
  name: 'ProTable',
  inheritAttrs: false,
})

// Card 相关的 props
defineProps({
  // Card body 的自定义样式
  cardBodyStyle: {
    type: Object,
    default: () => ({}),
  },
  // 是否显示 Card 包裹，设置为 false 时等同于直接使用 VxeGrid
  showCard: {
    type: Boolean,
    default: true,
  },
})

// 获取所有属性
const attrs = useAttrs()

// 默认工具栏配置
const defaultToolbarConfig = {
  // 显示缩放按钮（全屏/还原）
  zoom: true,
  // 显示自定义列按钮（显示/隐藏列）
  custom: true,
  // 自定义插槽（用于左侧自定义按钮）
  slots: {
    buttons: 'tool',
  },
}

/**
 * 深度合并对象
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @returns {Object} 合并后的对象
 */
function deepMerge(target, source) {
  const result = { ...target }
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key])
    } else {
      result[key] = source[key]
    }
  }
  return result
}

// 分离 class 和 style，应用到外层容器
const containerAttrs = computed(() => {
  const { class: className, style } = attrs
  return { class: className, style }
})

// 其他属性传递给 VxeGrid，同时合并工具栏配置
const tableAttrs = computed(() => {
  const {
    class: _,
    style: __,
    toolbarConfig,
    'toolbar-config': toolbarConfigKebab,
    ...rest
  } = attrs

  // 优先使用驼峰命名，其次使用 kebab-case 命名
  const userToolbarConfig = toolbarConfig || toolbarConfigKebab

  // 合并工具栏配置：默认配置 + 传入的配置
  const mergedToolbarConfig = userToolbarConfig
    ? deepMerge(defaultToolbarConfig, userToolbarConfig)
    : defaultToolbarConfig

  // 调试日志（开发环境）
  if (import.meta.env.DEV && userToolbarConfig) {
    console.log('🔧 ProTable 工具栏配置合并:')
    console.log('  默认配置:', defaultToolbarConfig)
    console.log('  用户配置:', userToolbarConfig)
    console.log('  合并结果:', mergedToolbarConfig)
  }

  return {
    ...rest,
    toolbarConfig: mergedToolbarConfig,
  }
})

// VxeGrid 实例引用
const gridRef = ref()

// 暴露 VxeGrid 实例的所有方法，使父组件可以直接调用
defineExpose({
  // 获取原始 Grid 实例
  getGrid: () => gridRef.value,
  // 表格方法
  clearAll: () => gridRef.value?.clearAll(),
  clearData: () => gridRef.value?.clearData(),
  clearCheckboxRow: () => gridRef.value?.clearCheckboxRow(),
  clearCheckboxReserve: () => gridRef.value?.clearCheckboxReserve(),
  clearRadioRow: () => gridRef.value?.clearRadioRow(),
  clearRadioReserve: () => gridRef.value?.clearRadioReserve(),
  clearCurrentRow: () => gridRef.value?.clearCurrentRow(),
  clearCurrentColumn: () => gridRef.value?.clearCurrentColumn(),
  clearCellAreas: () => gridRef.value?.clearCellAreas(),
  clearCopyCellArea: () => gridRef.value?.clearCopyCellArea(),
  clearSelected: () => gridRef.value?.clearSelected(),
  clearRowExpand: () => gridRef.value?.clearRowExpand(),
  clearTreeExpand: () => gridRef.value?.clearTreeExpand(),
  // 获取数据
  getData: () => gridRef.value?.getData(),
  getTableData: () => gridRef.value?.getTableData(),
  getCheckboxRecords: () => gridRef.value?.getCheckboxRecords(),
  getCheckboxReserveRecords: () => gridRef.value?.getCheckboxReserveRecords(),
  getRadioRecord: () => gridRef.value?.getRadioRecord(),
  getRadioReserveRecord: () => gridRef.value?.getRadioReserveRecord(),
  getCurrentRecord: () => gridRef.value?.getCurrentRecord(),
  getRowNode: row => gridRef.value?.getRowNode(row),
  getColumns: () => gridRef.value?.getColumns(),
  getColumnByField: field => gridRef.value?.getColumnByField(field),
  // 刷新
  refreshData: () => gridRef.value?.refreshData(),
  refreshColumn: () => gridRef.value?.refreshColumn(),
  reloadData: data => gridRef.value?.reloadData(data),
  loadData: data => gridRef.value?.loadData(data),
  // 其他常用方法
  insert: record => gridRef.value?.insert(record),
  insertAt: (record, row) => gridRef.value?.insertAt(record, row),
  remove: row => gridRef.value?.remove(row),
  removeCheckboxRow: () => gridRef.value?.removeCheckboxRow(),
  reloadRow: (rows, record) => gridRef.value?.reloadRow(rows, record),
  recalculate: () => gridRef.value?.recalculate(),
  scrollToRow: row => gridRef.value?.scrollToRow(row),
  scrollToColumn: column => gridRef.value?.scrollToColumn(column),
})
</script>

<template>
  <el-card
    v-if="showCard"
    v-bind="containerAttrs"
    shadow="never"
    :body-style="cardBodyStyle"
    class="pro-table-card"
  >
    <vxe-grid ref="gridRef" v-bind="tableAttrs">
      <!-- 传递所有插槽 -->
      <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </vxe-grid>
  </el-card>
  <vxe-grid v-else ref="gridRef" v-bind="tableAttrs">
    <!-- 传递所有插槽 -->
    <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </vxe-grid>
</template>

<style lang="scss" scoped>
.pro-table-card {
  :deep(.el-card__body) {
    padding-bottom: 0;
  }
}
</style>
