import {
  useClipboard,
  useDateFormat,
  useDebounceFn,
  useLocalStorage,
  useNow,
  useSessionStorage,
  useThrottleFn,
} from '@vueuse/core'

/**
 * 时间处理工具函数
 */
export const useTimeUtils = () => {
  /**
   * 日期格式化函数
   * @param {Date|string|number} date - 日期对象、时间戳或日期字符串
   * @param {string} format - 格式字符串，默认 'YYYY-MM-DD HH:mm:ss'
   * @returns {string} 格式化后的日期字符串
   */
  const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      console.warn('Invalid date provided to formatDate')
      return ''
    }

    // 使用 VueUse 的 useDateFormat 进行响应式格式化，但这里作为普通函数使用
    const formatted = useDateFormat(dateObj, format)
    return formatted.value
  }

  /**
   * 获取相对时间描述（如"3分钟前"）
   * @param {Date|string|number} timestamp - 时间戳或日期
   * @returns {string} 相对时间描述
   */
  const getRelativeTime = (timestamp) => {
    const now = new Date()
    const target = new Date(timestamp)
    const diffInSeconds = Math.floor((now - target) / 1000)

    if (diffInSeconds < 60) return '刚刚'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}分钟前`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}小时前`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}天前`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}月前`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 31536000)}年前`

    return formatDate(target, 'YYYY-MM-DD')
  }

  /**
   * 获取当前时间的响应式引用
   * @returns {Object} 包含当前时间的ref对象
   */
  const useCurrentTime = () => {
    return useNow()
  }

  return {
    formatDate,
    getRelativeTime,
    useCurrentTime,
  }
}

/**
 * 字符串处理工具函数
 */
export const useStringUtils = () => {
  /**
   * 首字母大写
   * @param {string} str - 输入字符串
   * @returns {string} 首字母大写的字符串
   */
  const capitalize = (str) => {
    if (!str || typeof str !== 'string') return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  /**
   * 驼峰命名转换
   * @param {string} str - 输入字符串
   * @param {string} separator - 分隔符，默认'-'
   * @returns {string} 驼峰命名字符串
   */
  const toCamelCase = (str, separator = '-') => {
    if (!str || typeof str !== 'string') return ''
    return str.replace(new RegExp(`${separator}([a-z])`, 'g'), (match, letter) =>
      letter.toUpperCase(),
    )
  }

  /**
   * 截断字符串并添加省略号
   * @param {string} str - 输入字符串
   * @param {number} length - 最大长度
   * @param {string} suffix - 后缀，默认'...'
   * @returns {string} 截断后的字符串
   */
  const truncate = (str, length, suffix = '...') => {
    if (!str || typeof str !== 'string') return ''
    if (str.length <= length) return str
    return str.substring(0, length) + suffix
  }

  /**
   * 隐藏部分手机号
   * @param {string} phone - 手机号码
   * @param {number} start - 开始位置，默认3
   * @param {number} end - 结束位置，默认7
   * @param {string} mask - 掩码字符，默认'*'
   * @returns {string} 隐藏后的手机号
   */
  const maskPhone = (phone, start = 3, end = 7, mask = '*') => {
    if (!phone || typeof phone !== 'string') return ''
    if (phone.length < end) return phone
    return phone.substring(0, start) + mask.repeat(end - start) + phone.substring(end)
  }

  return {
    capitalize,
    toCamelCase,
    truncate,
    maskPhone,
  }
}

/**
 * 判空处理工具函数
 */
export const useValidationUtils = () => {
  /**
   * 检查值是否为空（null、undefined、空字符串、空数组、空对象）
   * @param {*} value - 要检查的值
   * @returns {boolean} 是否为空
   */
  const isEmpty = (value) => {
    if (value === null || value === undefined) return true
    if (typeof value === 'string') return value.trim() === ''
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object') return Object.keys(value).length === 0
    return false
  }

  /**
   * 检查值是否为空或仅包含空格
   * @param {string} value - 要检查的字符串
   * @returns {boolean} 是否为空或空白
   */
  const isBlank = (value) => {
    if (value === null || value === undefined) return true
    if (typeof value === 'string') return value.trim() === ''
    return false
  }

  /**
   * 深度检查对象是否为空（递归检查嵌套对象）
   * @param {Object} obj - 要检查的对象
   * @returns {boolean} 是否为空对象
   */
  const isEmptyDeep = (obj) => {
    if (isEmpty(obj)) return true
    if (typeof obj !== 'object') return false

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!isEmptyDeep(obj[key])) {
          return false
        }
      }
    }
    return true
  }

  return {
    isEmpty,
    isBlank,
    isEmptyDeep,
  }
}

/**
 * 防抖节流工具函数
 */
export const useRestrictUtils = () => {
  /**
   * 防抖函数
   * @param {Function} fn - 要执行的函数
   * * @param {number} delay - 延迟时间(毫秒)
   * * @param {Object} options - 配置选项
   * * @returns {Function} 防抖后的函数
   */
  const debounce = (fn, delay = 300, options = {}) => {
    return useDebounceFn(fn, delay, options)
  }

  /**
   * 节流函数
   * @param {Function} fn - 要执行的函数
   * * @param {number} delay - 延迟时间(毫秒)
   * * @param {Object} options - 配置选项
   * * @returns {Function} 节流后的函数
   */
  const throttle = (fn, delay = 300, options = {}) => {
    return useThrottleFn(fn, delay, options)
  }

  return {
    debounce,
    throttle,
  }
}

/**
 * 存储管理工具函数
 */
export const useStorageUtils = () => {
  /**
   * 本地存储封装
   * @param {string} key - 存储键名
   * @param {*} defaultValue - 默认值
   * * @returns {Object} 包含value的ref对象
   */
  const useLocalStorageWrapper = (key, defaultValue) => {
    return useLocalStorage(key, defaultValue)
  }

  /**
   * 会话存储封装
   * @param {string} key - 存储键名
   * @param {*} defaultValue - 默认值
   * * @returns {Object} 包含value的ref对象
   */
  const useSessionStorageWrapper = (key, defaultValue) => {
    return useSessionStorage(key, defaultValue)
  }

  /**
   * 移除存储项
   * @param {string} key - 要移除的键名
   * * @param {Storage} storage - 存储类型，默认localStorage
   */
  const removeStorageItem = (key, storage = localStorage) => {
    storage.removeItem(key)
  }

  /**
   * 清空存储
   * @param {Storage} storage - 存储类型，默认localStorage
   */
  const clearStorage = (storage = localStorage) => {
    storage.clear()
  }

  return {
    useLocalStorageWrapper,
    useSessionStorageWrapper,
    removeStorageItem,
    clearStorage,
  }
}

/**
 * 浏览器相关工具函数
 */
export const useBrowserUtils = () => {
  /**
   * 剪贴板操作
   * * @returns {Object} 剪贴板相关方法
   */
  const useClipboardWrapper = () => {
    return useClipboard()
  }

  /**
   * 复制文本到剪贴板
   * @param {string} text - 要复制的文本
   * * @returns {Promise<boolean>} 是否复制成功
   */
  const copyToClipboard = async (text) => {
    const { copy, isSupported } = useClipboard()
    if (!isSupported) {
      console.error('Clipboard API is not supported')
      return false
    }
    await copy(text)
    return true
  }

  return {
    useClipboardWrapper,
    copyToClipboard,
  }
}

/**
 * 通用工具函数主入口
 */
export const useUtilities = () => {
  const timeUtils = useTimeUtils()
  const stringUtils = useStringUtils()
  const validationUtils = useValidationUtils()
  const restrictUtils = useRestrictUtils()
  const storageUtils = useStorageUtils()
  const browserUtils = useBrowserUtils()

  return {
    // 时间处理
    ...timeUtils,
    // 字符串处理
    ...stringUtils,
    // 判空处理
    ...validationUtils,
    // 防抖节流
    ...restrictUtils,
    // 存储管理
    ...storageUtils,
    // 浏览器工具
    ...browserUtils,
  }
}

export default useUtilities
