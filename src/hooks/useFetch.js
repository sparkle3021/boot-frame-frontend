import { useRequest } from 'vue-hooks-plus'

/**
 * 统一请求Hooks
 * @param {Function} service - 异步请求函数
 * @param {Object} options - 配置选项
 * @returns {Object} 包含请求状态和操作方法
 */
const useFetch = (service, options = {}) => {
  return useRequest(service, {
    manual: true, // 是否手动触发
    defaultParams: [], // 默认参数
    refreshDeps: [], // 依赖刷新
    refreshDepsAction: () => {}, // 依赖刷新时的操作
    loadingDelay: 0, // 延迟显示loading
    pollingInterval: 0, // 轮询间隔
    pollingWhenHidden: true, // 页面隐藏时是否继续轮询
    debounceInterval: 0, // 防抖间隔
    throttleInterval: 0, // 节流间隔
    ready: true, // 是否准备就绪
    throwOnError: false, // 是否抛出错误
    ...options, // 覆盖默认配置
  })
}

export default useFetch
