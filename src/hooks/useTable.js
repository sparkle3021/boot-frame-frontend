import { reactive, ref } from 'vue'
/**
 * 分页表格操作封装
 * @param {*} apiFn 接口方法
 * @param {*} initialParams 查询参数（不包含分页参数）
 * @returns
 */
export function useTable(apiFn, initialParams = {}) {
  //=== 表格数据与加载状态
  const data = ref([])
  const loading = ref(false)
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  })

  //=== 搜索表单数据
  const params = ref({ ...initialParams })

  //=== 加载数据
  const loadData = async () => {
    loading.value = true
    try {
      const params = {
        current: pagination.currentPage,
        pageSize: pagination.pageSize,
        ...params.value,
      }
      const res = await apiFn(params)
      data.value = res.data.records || []
      pagination.total = res.data.total || 0
    } catch (err) {
      console.error('加载数据失败', err)
    } finally {
      loading.value = false
    }
  }

  //=== 搜索
  const handleSearch = (searchParams) => {
    params.value = { ...searchParams }
    pagination.currentPage = 1 // 重置到第一页
    loadData()
  }

  //=== 重置搜索
  const handleReset = () => {
    params.value = { ...initialParams }
    pagination.currentPage = 1
    loadData()
  }

  //=== 分页变化
  const handlePageChange = ({ currentPage, pageSize }) => {
    pagination.currentPage = currentPage
    pagination.pageSize = pageSize
    loadData()
  }

  return {
    data,
    loading,
    params,
    pagination,
    loadData,
    handleSearch,
    handleReset,
    handlePageChange,
  }
}
