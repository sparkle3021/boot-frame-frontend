<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'

// 搜索表单配置
const searchColumns = [
  {
    label: '用户名',
    prop: 'username',
    valueType: 'text',
    fieldProps: {
      placeholder: '请输入用户名',
      clearable: true,
    },
  },
  {
    label: '状态',
    prop: 'status',
    valueType: 'select',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 },
    ],
    fieldProps: {
      placeholder: '请选择状态',
      clearable: true,
    },
  },
]

// VxeGrid 表格列配置
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
  // 用户名
  {
    field: 'username',
    title: '用户名',
    minWidth: 120,
    showOverflow: 'tooltip',
  },
  // 昵称
  {
    field: 'nickname',
    title: '昵称',
    minWidth: 120,
    showOverflow: 'tooltip',
  },
  // 邮箱
  {
    field: 'email',
    title: '邮箱',
    minWidth: 180,
    showOverflow: 'tooltip',
  },
  // 手机号
  {
    field: 'phone',
    title: '手机号',
    minWidth: 140,
    align: 'center',
  },
  // 角色
  {
    field: 'role',
    title: '角色',
    minWidth: 120,
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
  // 创建时间
  {
    field: 'createTime',
    title: '创建时间',
    minWidth: 180,
    align: 'center',
    sortable: true,
  },
  // 操作列（使用插槽自定义渲染）
  {
    title: '操作',
    width: 280,
    fixed: 'right',
    align: 'center',
    slots: { default: 'action' },
  },
]

// 模拟数据
const mockData = [
  {
    id: 1,
    username: 'admin',
    nickname: '管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    role: '超级管理员',
    status: 1,
    createTime: '2024-01-01 10:00:00',
  },
  {
    id: 2,
    username: 'user1',
    nickname: '普通用户1',
    email: 'user1@example.com',
    phone: '13800138001',
    role: '普通用户',
    status: 1,
    createTime: '2024-01-02 10:00:00',
  },
  {
    id: 3,
    username: 'user2',
    nickname: '普通用户2',
    email: 'user2@example.com',
    phone: '13800138002',
    role: '普通用户',
    status: 0,
    createTime: '2024-01-03 10:00:00',
  },
  {
    id: 4,
    username: 'user3',
    nickname: '普通用户3',
    email: 'user3@example.com',
    phone: '13800138003',
    role: '普通用户',
    status: 1,
    createTime: '2024-01-04 10:00:00',
  },
  {
    id: 5,
    username: 'user4',
    nickname: '普通用户4',
    email: 'user4@example.com',
    phone: '13800138004',
    role: '普通用户',
    status: 0,
    createTime: '2024-01-05 10:00:00',
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

// 工具栏配置（只需要配置额外的功能，基础配置会自动合并）
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
}

// 搜索表单数据
const searchForm = ref({})

// 加载数据的方法
const loadData = async (params = {}) => {
  loading.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500))

    // 合并搜索参数
    const searchParams = { ...searchForm.value, ...params }

    // 模拟搜索过滤
    let filteredData = [...mockData]
    if (searchParams.username) {
      filteredData = filteredData.filter(
        item =>
          item.username.includes(searchParams.username) ||
          item.nickname.includes(searchParams.username)
      )
    }
    if (searchParams.status !== '' && searchParams.status !== undefined) {
      filteredData = filteredData.filter(item => item.status === Number(searchParams.status))
    }

    // 模拟分页
    const start = (pagerConfig.currentPage - 1) * pagerConfig.pageSize
    const end = start + pagerConfig.pageSize

    tableData.value = filteredData.slice(start, end)
    pagerConfig.total = filteredData.length

    return {
      data: tableData.value,
      total: filteredData.length,
    }
  } catch (error) {
    ElMessage.error('获取用户列表失败')
    return {
      data: [],
      total: 0,
    }
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = values => {
  searchForm.value = values
  pagerConfig.currentPage = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.value = {}
  pagerConfig.currentPage = 1
  loadData()
}

// 新增用户
const handleAdd = () => {
  ElMessage.info('新增用户功能开发中...')
}

// 编辑用户
const handleEdit = row => {
  ElMessage.info(`编辑用户: ${row.username}`)
}

// 切换用户状态
const handleToggleStatus = async row => {
  const action = row.status === 1 ? '禁用' : '启用'
  try {
    await ElMessageBox.confirm(`确定要${action}用户 "${row.username}" 吗？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    // 模拟API调用
    row.status = row.status === 1 ? 0 : 1
    ElMessage.success(`${action}成功`)
    loadData()
  } catch {
    // 用户取消操作
  }
}

// 删除用户
const handleDelete = async row => {
  // 模拟API调用
  const index = tableData.value.findIndex(item => item.id === row.id)
  if (index > -1) {
    tableData.value.splice(index, 1)
    pagerConfig.total--
  }
  ElMessage.success('删除成功')
  loadData()
}

// 分页改变
const handlePageChange = ({ currentPage, pageSize }) => {
  pagerConfig.currentPage = currentPage
  pagerConfig.pageSize = pageSize
  loadData()
}

// 刷新
const handleRefresh = () => {
  loadData()
  ElMessage.success('刷新成功')
}

// 批量删除
const handleBatchDelete = async () => {
  const selectRecords = gridRef.value?.getCheckboxRecords() || []
  if (!selectRecords.length) {
    ElMessage.warning('请选择要删除的用户')
    return
  }

  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selectRecords.length} 个用户吗？此操作不可恢复！`,
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
      }
    )

    // 模拟API调用
    ElMessage.success('批量删除成功')
    gridRef.value?.clearCheckboxRow()
    loadData()
  } catch {
    // 用户取消操作
  }
}

// 导出数据
const handleExport = () => {
  ElMessage.info('导出功能开发中...')
}

// 初始化加载数据
onMounted(() => {
  loadData()
})
</script>

<template>
  <div>
    <!-- 搜索表单 -->
    <el-card>
      <PlusSearch
        v-model="searchForm"
        :columns="searchColumns"
        label-width="80px"
        @search="handleSearch"
        @reset="handleReset"
      />
    </el-card>

    <!-- 数据表格 -->
    <ProTable
      ref="gridRef"
      class="mt-1rem"
      v-loading="loading"
      height="520"
      :columns="columns"
      :data="tableData"
      :pager-config="pagerConfig"
      :toolbar-config="toolbarConfig"
      stripe
      @page-change="handlePageChange"
    >
      <!-- 工具栏左侧按钮插槽 -->
      <template #tool>
        <el-button type="primary" @click="handleAdd">
          <template #icon>
            <i class="vxe-icon-add"></i>
          </template>
          新增用户
        </el-button>
        <el-button type="danger" @click="handleBatchDelete">
          <template #icon>
            <i class="vxe-icon-delete"></i>
          </template>
          批量删除
        </el-button>
        <el-button @click="handleExport">
          <template #icon>
            <i class="vxe-icon-download"></i>
          </template>
          导出
        </el-button>
      </template>

      <!-- 状态列 -->
      <template #status="{ row }">
        <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
          {{ row.status === 1 ? '启用' : '禁用' }}
        </el-tag>
      </template>

      <!-- 操作列 -->
      <template #action="{ row }">
        <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
        <el-button
          v-if="row.status === 1"
          type="warning"
          size="small"
          @click="handleToggleStatus(row)"
        >
          禁用
        </el-button>
        <el-button v-else type="success" size="small" @click="handleToggleStatus(row)">
          启用
        </el-button>
        <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
      </template>
    </ProTable>
  </div>
</template>
