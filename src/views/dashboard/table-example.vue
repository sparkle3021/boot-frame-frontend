<script setup>
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

// 表格列配置
const columns = [
  // 复选框列
  {
    type: 'checkbox',
    width: 60,
    fixed: 'left',
    align: 'center',
  },
  // 序号列
  {
    type: 'seq',
    title: '序号',
    width: 80,
    fixed: 'left',
    align: 'center',
  },
  // ID列
  {
    field: 'id',
    title: 'ID',
    width: 80,
    align: 'center',
    sortable: true,
  },
  // 产品名称
  {
    field: 'name',
    title: '产品名称',
    minWidth: 150,
    showOverflow: 'tooltip',
  },
  // 分类
  {
    field: 'category',
    title: '分类',
    width: 120,
    align: 'center',
  },
  // 价格
  {
    field: 'price',
    title: '价格（元）',
    width: 120,
    align: 'right',
  },
  // 库存
  {
    field: 'stock',
    title: '库存',
    width: 100,
    align: 'center',
  },
  // 状态（使用插槽自定义渲染）
  {
    field: 'status',
    title: '状态',
    width: 100,
    align: 'center',
    slots: { default: 'status' },
  },
  // 操作列（使用插槽自定义渲染）
  {
    title: '操作',
    width: 200,
    fixed: 'right',
    align: 'center',
    slots: { default: 'action' },
  },
]

// 模拟数据
const mockData = [
  {
    id: 1,
    name: 'MacBook Pro 16',
    category: '笔记本电脑',
    price: 19999,
    stock: 50,
    status: 1,
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    category: '智能手机',
    price: 8999,
    stock: 120,
    status: 1,
  },
  {
    id: 3,
    name: 'iPad Air',
    category: '平板电脑',
    price: 4999,
    stock: 0,
    status: 0,
  },
  {
    id: 4,
    name: 'AirPods Pro',
    category: '音频设备',
    price: 1999,
    stock: 200,
    status: 1,
  },
  {
    id: 5,
    name: 'Apple Watch',
    category: '智能手表',
    price: 3299,
    stock: 80,
    status: 1,
  },
]

// 表格数据
const tableData = ref([])
const loading = ref(false)
const gridRef = ref()

// 分页配置
const pagerConfig = reactive({
  // 启用分页（必须显式启用）
  enabled: true,
  // 当前页码
  currentPage: 1,
  // 每页显示条数
  pageSize: 10,
  // 总条数
  total: 0,
})

// 工具栏配置 - 测试配置合并效果
// 只配置刷新功能，zoom、custom、slots 会自动从默认配置中合并
const toolbarConfig = {
  // 显示刷新按钮（在工具栏右侧）
  refresh: true,
  // 刷新配置
  refreshOptions: {
    // 查询方法
    query: () => {
      handleRefresh()
    },
  },
  // 注意：这里没有配置 zoom、custom、slots
  // 它们会从 ProTable 组件的默认配置中自动合并
}

// 加载数据的方法
const loadData = async () => {
  loading.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 800))

    // 模拟分页
    const start = (pagerConfig.currentPage - 1) * pagerConfig.pageSize
    const end = start + pagerConfig.pageSize

    tableData.value = mockData.slice(start, end)
    pagerConfig.total = mockData.length

    return {
      data: tableData.value,
      total: mockData.length,
    }
  } catch (error) {
    ElMessage.error('获取数据失败')
    return {
      data: [],
      total: 0,
    }
  } finally {
    loading.value = false
  }
}

// 分页改变
const handlePageChange = ({ currentPage, pageSize }) => {
  pagerConfig.currentPage = currentPage
  pagerConfig.pageSize = pageSize
  loadData()
}

// 刷新
const handleRefresh = () => {
  console.log('🔄 刷新按钮被点击 - 配置合并成功！')
  loadData()
  ElMessage.success('刷新成功')
}

// 新增产品
const handleAdd = () => {
  ElMessage.info('新增产品功能')
  console.log('➕ 新增按钮被点击 - 工具栏插槽正常工作！')
}

// 编辑产品
const handleEdit = row => {
  ElMessage.info(`编辑产品: ${row.name}`)
  console.log('✏️ 编辑按钮被点击:', row)
}

// 删除产品
const handleDelete = row => {
  ElMessage.info(`删除产品: ${row.name}`)
  console.log('🗑️ 删除按钮被点击:', row)
}

// 批量删除
const handleBatchDelete = () => {
  const selectRecords = gridRef.value?.getCheckboxRecords() || []
  if (!selectRecords.length) {
    ElMessage.warning('请选择要删除的产品')
    return
  }
  ElMessage.success(`批量删除 ${selectRecords.length} 个产品`)
  console.log('🗑️ 批量删除按钮被点击，选中:', selectRecords)
}

// 初始化加载数据
onMounted(() => {
  loadData()
  console.log('📋 ProTable 工具栏配置测试页面已加载')
  console.log('✅ 测试要点：')
  console.log('  1. 刷新按钮（右上角）- 来自页面配置')
  console.log('  2. 缩放按钮（右上角）- 来自默认配置')
  console.log('  3. 自定义列按钮（右上角）- 来自默认配置')
  console.log('  4. 左侧工具栏按钮（新增、批量删除）- 使用 #tool 插槽')
})
</script>

<template>
  <div class="table-example-page">
    <!-- 页面标题 -->
    <el-card class="page-header">
      <div class="header-content">
        <div>
          <h2>ProTable 工具栏配置测试</h2>
          <p class="description">测试默认工具栏配置与自定义配置的合并效果</p>
        </div>
        <el-tag type="success" size="large">配置合并测试</el-tag>
      </div>
    </el-card>

    <!-- 功能说明 -->
    <el-card class="config-info">
      <template #header>
        <span>🔍 配置说明</span>
      </template>
      <el-space direction="vertical" :size="12" style="width: 100%">
        <div class="info-item">
          <el-tag type="primary" size="small">默认配置</el-tag>
          <span>
            ProTable 组件自动提供：
            <code>zoom: true</code>
            ,
            <code>custom: true</code>
            ,
            <code>slots.buttons: 'tool'</code>
          </span>
        </div>
        <div class="info-item">
          <el-tag type="success" size="small">页面配置</el-tag>
          <span>
            本页面只配置了：
            <code>refresh: true</code>
            ,
            <code>refreshOptions: {...}</code>
          </span>
        </div>
        <div class="info-item">
          <el-tag type="warning" size="small">合并结果</el-tag>
          <span>最终表格拥有：刷新 + 缩放 + 自定义列 + 工具栏插槽（所有功能）</span>
        </div>
      </el-space>
    </el-card>

    <!-- 数据表格 -->
    <ProTable
      ref="gridRef"
      class="mt-1rem"
      v-loading="loading"
      height="450"
      :columns="columns"
      :data="tableData"
      :pager-config="pagerConfig"
      :toolbar-config="toolbarConfig"
      stripe
      border
      @page-change="handlePageChange"
    >
      <!-- 工具栏左侧按钮插槽 -->
      <template #tool>
        <el-button type="primary" @click="handleAdd">
          <template #icon>
            <i class="vxe-icon-add"></i>
          </template>
          新增产品
        </el-button>
        <el-button type="danger" @click="handleBatchDelete">
          <template #icon>
            <i class="vxe-icon-delete"></i>
          </template>
          批量删除
        </el-button>
      </template>

      <!-- 状态列 -->
      <template #status="{ row }">
        <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
          {{ row.status === 1 ? '在售' : '缺货' }}
        </el-tag>
      </template>

      <!-- 操作列 -->
      <template #action="{ row }">
        <el-button type="primary" size="small" link @click="handleEdit(row)">编辑</el-button>
        <el-button type="danger" size="small" link @click="handleDelete(row)">删除</el-button>
      </template>
    </ProTable>

    <!-- 测试结果说明 -->
    <el-card class="test-result">
      <template #header>
        <span>✅ 测试验证点</span>
      </template>
      <el-space direction="vertical" :size="8">
        <div class="result-item">
          <el-icon color="#67c23a"><i class="vxe-icon-refresh"></i></el-icon>
          <span>
            工具栏右上角应显示
            <strong>刷新按钮</strong>
            （来自页面配置）
          </span>
        </div>
        <div class="result-item">
          <el-icon color="#409eff"><i class="vxe-icon-fullscreen"></i></el-icon>
          <span>
            工具栏右上角应显示
            <strong>缩放按钮</strong>
            （来自默认配置）
          </span>
        </div>
        <div class="result-item">
          <el-icon color="#e6a23c"><i class="vxe-icon-custom-column"></i></el-icon>
          <span>
            工具栏右上角应显示
            <strong>自定义列按钮</strong>
            （来自默认配置）
          </span>
        </div>
        <div class="result-item">
          <el-icon color="#f56c6c"><i class="vxe-icon-add"></i></el-icon>
          <span>
            工具栏左侧应显示
            <strong>新增、批量删除按钮</strong>
            （#tool 插槽）
          </span>
        </div>
      </el-space>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.table-example-page {
  padding: 20px;

  .page-header {
    margin-bottom: 16px;

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        margin: 0 0 8px 0;
        color: var(--el-text-color-primary);
        font-size: 20px;
        font-weight: 600;
      }

      .description {
        margin: 0;
        color: var(--el-text-color-secondary);
        font-size: 14px;
      }
    }
  }

  .config-info {
    margin-bottom: 16px;

    .info-item {
      display: flex;
      align-items: center;
      gap: 12px;

      code {
        background-color: var(--el-fill-color-light);
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 13px;
        color: var(--el-color-primary);
        font-family: 'Consolas', 'Monaco', monospace;
      }
    }
  }

  .test-result {
    margin-top: 16px;

    .result-item {
      display: flex;
      align-items: center;
      gap: 8px;

      strong {
        color: var(--el-color-primary);
      }
    }
  }
}
</style>
