import { reactive, ref, watch } from 'vue'
import useFetch from './useFetch'

/**
 * 分页表格操作封装
 * @param {Function} apiFn - 接口方法
 * @param {Object} initialParams - 查询参数（不包含分页参数）
 * @param {Object} options - 配置选项（与useFetch的options参数相同）
 * @returns {Object} 包含表格状态和操作方法
 */
export function useTable(apiFn, initialParams = {}, options = {}) {
  //=== 表格数据与状态
  const data = ref([])
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  })

  //=== 搜索表单数据
  const params = ref({ ...initialParams })

  //=== 创建请求函数，将分页参数和查询参数合并
  const requestFn = (queryParams = {}) => {
    const mergedParams = {
      current: pagination.currentPage,
      pageSize: pagination.pageSize,
      ...params.value,
      ...queryParams,
    }
    return apiFn(mergedParams)
  }

  //=== 使用useFetch处理请求
  const {
    run: loadData,
    loading,
    data: responseData,
    refresh,
    ...rest
  } = useFetch(requestFn, {
    ...options,
  })

  //=== 监听响应数据变化，更新表格数据
  watch(
    responseData,
    (newData) => {
      if (newData) {
        data.value = newData.records || []
        pagination.total = newData.total || 0
      }
    },
    { immediate: true },
  )

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
    refresh,
    handleSearch,
    handleReset,
    handlePageChange,
    ...rest,
  }
}
