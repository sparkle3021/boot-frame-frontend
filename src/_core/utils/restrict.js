import { useDebounceFn, useThrottleFn } from '@vueuse/core'

/**
 * 防抖函数
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间(毫秒)
 * @param {Object} options - 配置选项
 * @returns {Function} 防抖后的函数
 */
const debounce = (fn, delay = 300, options = {}) => {
  return useDebounceFn(fn, delay, options)
}

/**
 * 节流函数
 * @param {Function} fn - 要执行的函数
 * @param {number} delay - 延迟时间(毫秒)
 * @param {Object} options - 配置选项
 * @returns {Function} 节流后的函数
 */
const throttle = (fn, delay = 300, options = {}) => {
  return useThrottleFn(fn, delay, options)
}

/**
 * 防抖节流工具类
 */
export const restrictUtils = {
  debounce,
  throttle,
}

export default restrictUtils

