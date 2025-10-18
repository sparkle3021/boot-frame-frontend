<script setup>
import { Icon } from '@iconify/vue'
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
      clearable: true
    }
  },
  {
    label: '状态',
    prop: 'status',
    valueType: 'select',
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ],
    fieldProps: {
      placeholder: '请选择状态',
      clearable: true
    }
  }
]

// 表格列配置
const columns = [
  {
    label: 'ID',
    prop: 'id',
    width: 80
  },
  {
    label: '用户名',
    prop: 'username'
  },
  {
    label: '昵称',
    prop: 'nickname'
  },
  {
    label: '邮箱',
    prop: 'email'
  },
  {
    label: '手机号',
    prop: 'phone'
  },
  {
    label: '角色',
    prop: 'role'
  },
  {
    label: '状态',
    prop: 'status',
    width: 100,
    valueType: 'select',
    options: [
      { label: '启用', value: 1, color: 'green' },
      { label: '禁用', value: 0, color: 'red' }
    ]
  },
  {
    label: '创建时间',
    prop: 'createTime'
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
    createTime: '2024-01-01 10:00:00'
  },
  {
    id: 2,
    username: 'user1',
    nickname: '普通用户1',
    email: 'user1@example.com',
    phone: '13800138001',
    role: '普通用户',
    status: 1,
    createTime: '2024-01-02 10:00:00'
  },
  {
    id: 3,
    username: 'user2',
    nickname: '普通用户2',
    email: 'user2@example.com',
    phone: '13800138002',
    role: '普通用户',
    status: 0,
    createTime: '2024-01-03 10:00:00'
  },
  {
    id: 4,
    username: 'user3',
    nickname: '普通用户3',
    email: 'user3@example.com',
    phone: '13800138003',
    role: '普通用户',
    status: 1,
    createTime: '2024-01-04 10:00:00'
  },
  {
    id: 5,
    username: 'user4',
    nickname: '普通用户4',
    email: 'user4@example.com',
    phone: '13800138004',
    role: '普通用户',
    status: 0,
    createTime: '2024-01-05 10:00:00'
  }
]

// 表格数据
const tableData = ref([])
const loading = ref(false)
const selectedRows = ref([])

// 分页数据
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 搜索表单数据
const searchForm = ref({})

// 操作按钮配置
const actionButtons = [
  {
    text: '编辑',
    code: 'edit',
    props: {
      type: 'primary',
      size: 'small'
    }
  },
  {
    text: '启用',
    code: 'enable',
    props: (row) => ({
      type: row.status === 1 ? 'warning' : 'success',
      size: 'small'
    }),
    show: (row) => row.status === 0
  },
  {
    text: '禁用',
    code: 'disable',
    props: {
      type: 'warning',
      size: 'small'
    },
    show: (row) => row.status === 1
  },
  {
    text: '删除',
    code: 'delete',
    props: {
      type: 'danger',
      size: 'small'
    },
    confirm: {
      message: (data) => `确定要删除用户 "${data.row.username}" 吗？此操作不可恢复！`
    }
  }
]

// 处理操作按钮点击
const handleAction = ({ code, row, index }) => {
  switch (code) {
    case 'edit':
      handleEdit(row)
      break
    case 'enable':
    case 'disable':
      handleToggleStatus(row)
      break
    case 'delete':
      handleDelete(row)
      break
  }
}

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
      filteredData = filteredData.filter(item => 
        item.username.includes(searchParams.username) || 
        item.nickname.includes(searchParams.username)
      )
    }
    if (searchParams.status !== '' && searchParams.status !== undefined) {
      filteredData = filteredData.filter(item => item.status === Number(searchParams.status))
    }
    
    // 模拟分页
    const start = (pagination.page - 1) * pagination.pageSize
    const end = start + pagination.pageSize
    
    tableData.value = filteredData.slice(start, end)
    pagination.total = filteredData.length
    
    return {
      data: tableData.value,
      total: filteredData.length
    }
  } catch (error) {
    ElMessage.error('获取用户列表失败')
    return {
      data: [],
      total: 0
    }
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = (values) => {
  searchForm.value = values
  pagination.page = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchForm.value = {}
  pagination.page = 1
  loadData()
}

// 新增用户
const handleAdd = () => {
  ElMessage.info('新增用户功能开发中...')
}

// 编辑用户
const handleEdit = (row) => {
  ElMessage.info(`编辑用户: ${row.username}`)
}

// 切换用户状态
const handleToggleStatus = async (row) => {
  const action = row.status === 1 ? '禁用' : '启用'
  try {
    await ElMessageBox.confirm(
      `确定要${action}用户 "${row.username}" 吗？`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    
    // 模拟API调用
    row.status = row.status === 1 ? 0 : 1
    ElMessage.success(`${action}成功`)
    loadData()
  } catch {
    // 用户取消操作
  }
}

// 删除用户
const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除用户 "${row.username}" 吗？此操作不可恢复！`,
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }
    )
    
    // 模拟API调用
    const index = tableData.value.findIndex(item => item.id === row.id)
    if (index > -1) {
      tableData.value.splice(index, 1)
      pagination.total--
    }
    ElMessage.success('删除成功')
    loadData()
  } catch {
    // 用户取消操作
  }
}

// 分页改变
const handlePaginationChange = (page, pageSize) => {
  pagination.page = page
  pagination.pageSize = pageSize
  loadData()
}

// 刷新
const handleRefresh = () => {
  ElMessage.success('刷新成功')
  loadData()
}

// 批量删除
const handleBatchDelete = async () => {
  if (!selectedRows.value.length) {
    ElMessage.warning('请选择要删除的用户')
    return
  }
  
  try {
    await ElMessageBox.confirm(
      `确定要删除选中的 ${selectedRows.value.length} 个用户吗？此操作不可恢复！`,
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }
    )
    
    // 模拟API调用
    selectedRows.value = []
    ElMessage.success('批量删除成功')
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
  <div class="user-list">
    <!-- 搜索表单 -->
    <el-card class="search-card">
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
      v-loading="loading"
      :columns="columns"
      :table-data="tableData"
      :pagination="pagination"
      :title-bar="{ title: '用户列表' }"
      :has-toolbar="true"
      :action-bar="{
        buttons: actionButtons,
        type: 'button'
      }"
      stripe
      @page-change="handlePaginationChange"
      @clickAction="handleAction"
    >
      <!-- 左侧标题栏按钮 -->
      <template #title>
        <el-button type="primary" size="small" @click="handleAdd">
          <Icon icon="mdi:plus" width="16" />
          新增用户
        </el-button>
        <el-button type="danger" size="small" :disabled="!selectedRows.length" @click="handleBatchDelete">
          <Icon icon="mdi:delete" width="16" />
          批量删除
        </el-button>
      </template>
    </ProTable>
  </div>
</template>

<style lang="scss" scoped>
.user-list {
  padding: 20px;
  
  .search-card {
    margin-bottom: 20px;
  }
}
</style>
