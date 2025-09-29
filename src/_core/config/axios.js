import Axios from 'axios'
import { stringify } from 'qs'
import { SYS_CONSTANTS } from '../common/constants'

// 基础配置
const defaultConfig = {
  timeout: SYS_CONSTANTS.REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  paramsSerializer: {
    serialize: stringify,
  },
}

/**
 * 增强型 HTTP 客户端，基于 Axios 封装
 * 支持拦截器配置、请求取消、多实例管理等功能
 */
class HttpClient {
  /**
   * 创建 HTTP 客户端实例
   * @param {Object} customConfig 自定义 Axios 配置
   * @param {Object} interceptors 自定义拦截器配置
   */
  constructor(customConfig, interceptors) {
    this.instance = Axios.create({ ...defaultConfig, ...customConfig })
    this.requestInterceptorId = undefined
    this.responseInterceptorId = undefined
    this.abortControllers = new Map()
    this.initInterceptors(interceptors)
  }

  /** 初始化拦截器 */
  initInterceptors(interceptors) {
    this.initRequestInterceptor(
      interceptors?.requestInterceptor,
      interceptors?.requestErrorInterceptor,
    )
    this.initResponseInterceptor(
      interceptors?.responseInterceptor,
      interceptors?.responseErrorInterceptor,
    )
  }

  /** 初始化请求拦截器 */
  initRequestInterceptor(customInterceptor, customErrorInterceptor) {
    // 默认请求拦截器
    const defaultInterceptor = (config) => {
      // 添加token
      const token = localStorage.getItem(SYS_CONSTANTS.LOCAL_TOKEN_KEY)
      if (token) {
        config.headers[SYS_CONSTANTS.REQUEST_TOKEN_KEY] = `${token}`
      }
      return config
    }

    // 默认请求错误拦截器
    const defaultErrorInterceptor = (error) => {
      return Promise.reject(error)
    }

    // 优先使用自定义拦截器，否则使用默认拦截器
    this.requestInterceptorId = this.instance.interceptors.request.use(
      customInterceptor || defaultInterceptor,
      customErrorInterceptor || defaultErrorInterceptor,
    )
  }

  /** 初始化响应拦截器 */
  initResponseInterceptor(customInterceptor, customErrorInterceptor) {
    // 默认响应拦截器
    const defaultInterceptor = (response) => {
      const requestKey = this.getRequestKey(response.config)
      if (requestKey) this.abortControllers.delete(requestKey)
      return Promise.resolve(response.data)
    }

    // 默认响应错误拦截器
    const defaultErrorInterceptor = (error) => {
      if (error.config) {
        const requestKey = this.getRequestKey(error.config)
        if (requestKey) this.abortControllers.delete(requestKey)
      }

      // 处理请求被取消的情况
      if (Axios.isCancel(error)) {
        console.warn('请求已被取消:', error.message)
        return Promise.reject(new Error('请求已被取消'))
      }

      // 网络错误处理
      if (!error.response) {
        if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
          return Promise.reject(new Error('请求超时，请稍后重试'))
        }
        return Promise.reject(new Error('网络错误，请检查网络连接'))
      }

      // HTTP状态码错误处理
      const status = error.response?.status
      const commonErrors = {
        400: '请求参数错误',
        401: '未授权，请重新登录',
        403: '权限不足',
        404: '请求的资源不存在',
        408: '请求超时',
        500: '服务器内部错误',
        502: '网关错误',
        503: '服务暂不可用',
        504: '网关超时',
      }

      const message = commonErrors[status] || `请求失败（状态码：${status}）`
      return Promise.reject(new Error(message))
    }

    // 优先使用自定义拦截器，否则使用默认拦截器
    this.responseInterceptorId = this.instance.interceptors.response.use(
      customInterceptor || defaultInterceptor,
      customErrorInterceptor || defaultErrorInterceptor,
    )
  }

  /** 生成请求唯一标识 */
  getRequestKey(config) {
    if (!config.url) return undefined
    return `${config.method?.toUpperCase()}-${config.url}`
  }

  /** 设置取消控制器 */
  setupCancelController(config, requestKey) {
    const key = requestKey || this.getRequestKey(config)
    if (!key) return config

    // 如果已有相同key的请求，先取消它
    this.cancelRequest(key)

    const controller = new AbortController()
    this.abortControllers.set(key, controller)

    return {
      ...config,
      signal: controller.signal,
    }
  }

  /** 移除请求拦截器 */
  removeRequestInterceptor() {
    if (this.requestInterceptorId !== undefined) {
      this.instance.interceptors.request.eject(this.requestInterceptorId)
      this.requestInterceptorId = undefined
    }
  }

  /** 移除响应拦截器 */
  removeResponseInterceptor() {
    if (this.responseInterceptorId !== undefined) {
      this.instance.interceptors.response.eject(this.responseInterceptorId)
      this.responseInterceptorId = undefined
    }
  }

  /** 动态设置请求拦截器 */
  setRequestInterceptor(customInterceptor, customErrorInterceptor) {
    this.removeRequestInterceptor()
    this.initRequestInterceptor(customInterceptor, customErrorInterceptor)
  }

  /** 动态设置响应拦截器 */
  setResponseInterceptor(customInterceptor, customErrorInterceptor) {
    this.removeResponseInterceptor()
    this.initResponseInterceptor(customInterceptor, customErrorInterceptor)
  }

  /** 获取 Axios 实例 */
  getInstance() {
    return this.instance
  }

  /**
   * 取消某个请求
   * @param {string|symbol} key 请求唯一标识
   * @param {string} message 取消原因
   * @returns {boolean} 是否成功取消
   */
  cancelRequest(key, message) {
    const controller = this.abortControllers.get(key)
    if (controller) {
      controller.abort(message || `取消请求: ${String(key)}`)
      this.abortControllers.delete(key)
      return true
    }
    return false
  }

  /**
   * 取消所有请求
   * @param {string} message 取消原因
   */
  cancelAllRequests(message) {
    this.abortControllers.forEach((controller, key) => {
      controller.abort(message || `取消所有请求: ${String(key)}`)
    })
    this.abortControllers.clear()
  }

  /**
   * 判断是否为取消错误
   * @param {*} error 错误对象
   * @returns {boolean} 是否为取消错误
   */
  static isCancel(error) {
    return Axios.isCancel(error)
  }

  /**
   * 睡眠函数
   * @param {number} ms 毫秒数
   */
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  /**
   * 通用请求方法
   * @param {string} method 请求方法
   * @param {string} url 请求地址
   * @param {Object} config 请求配置
   * @returns {Promise} 响应数据
   */
  async request(method, url, config) {
    const { requestKey, retry, ...restConfig } = config || {}

    // 设置合理的默认重试条件
    const defaultRetryCondition = (error) => {
      // 默认只重试网络错误或5xx服务器错误
      return !error.response || (error.response.status >= 500 && error.response.status < 600)
    }

    const retryConfig = {
      retries: 0,
      retryDelay: 1000,
      retryCondition: defaultRetryCondition,
      ...retry,
    }

    let lastError
    const key = requestKey || this.getRequestKey({ ...restConfig, method, url })

    for (let attempt = 0; attempt <= retryConfig.retries; attempt++) {
      try {
        // 重试前清除旧的AbortController（避免重试请求被误取消）
        if (attempt > 0 && key) {
          this.abortControllers.delete(key)
        }

        const requestConfig = this.setupCancelController({ ...restConfig, method, url }, requestKey)
        const response = await this.instance.request(requestConfig)
        return Promise.resolve(response.data)
      } catch (error) {
        lastError = error

        // 如果是最后一次尝试或不满足重试条件或请求被取消，直接抛出错误
        if (
          attempt === retryConfig.retries ||
          !retryConfig.retryCondition(error) ||
          HttpClient.isCancel(error)
        ) {
          break
        }

        // 延迟后重试
        if (retryConfig.retryDelay > 0) {
          await this.sleep(retryConfig.retryDelay)
        }
      }
    }

    return Promise.reject(lastError)
  }

  /**
   * GET 请求
   * @param {string} url 请求地址
   * @param {Object} config 请求配置
   * @returns {Promise} 响应数据
   */
  get(url, config) {
    return this.request('get', url, config)
  }

  /**
   * POST 请求
   * @param {string} url 请求地址
   * @param {*} data 请求数据
   * @param {Object} config 请求配置
   * @returns {Promise} 响应数据
   */
  post(url, data, config) {
    return this.request('post', url, { ...config, data })
  }

  /**
   * PUT 请求
   * @param {string} url 请求地址
   * @param {*} data 请求数据
   * @param {Object} config 请求配置
   * @returns {Promise} 响应数据
   */
  put(url, data, config) {
    return this.request('put', url, { ...config, data })
  }

  /**
   * DELETE 请求
   * @param {string} url 请求地址
   * @param {Object} config 请求配置
   * @returns {Promise} 响应数据
   */
  delete(url, config) {
    return this.request('delete', url, config)
  }

  /**
   * PATCH 请求
   * @param {string} url 请求地址
   * @param {*} data 请求数据
   * @param {Object} config 请求配置
   * @returns {Promise} 响应数据
   */
  patch(url, data, config) {
    return this.request('patch', url, { ...config, data })
  }
}

// 默认导出实例
export const http = new HttpClient()
export default HttpClient
