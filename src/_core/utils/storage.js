import { useLocalStorage, useSessionStorage } from '@vueuse/core'

/**
 * 本地存储封装
 * @param {string} key - 存储键名
 * @param {*} defaultValue - 默认值
 * @returns {Object} 包含value的ref对象
 */
const useLocalStorageWrapper = (key, defaultValue) => {
  return useLocalStorage(key, defaultValue)
}

/**
 * 会话存储封装
 * @param {string} key - 存储键名
 * @param {*} defaultValue - 默认值
 * @returns {Object} 包含value的ref对象
 */
const useSessionStorageWrapper = (key, defaultValue) => {
  return useSessionStorage(key, defaultValue)
}

/**
 * 移除存储项
 * @param {string} key - 要移除的键名
 * @param {Storage} storage - 存储类型，默认localStorage
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

/**
 * 设置存储项（非响应式，支持过期时间）
 * @param {string} key - 键名
 * @param {*} value - 值
 * @param {number} expire - 过期时间（秒），0表示永不过期
 * @param {Storage} storage - 存储类型，默认localStorage
 */
const setItem = (key, value, expire = 0, storage = localStorage) => {
  const data = {
    value,
    expire: expire > 0 ? Date.now() + expire * 1000 : 0,
  }
  storage.setItem(key, JSON.stringify(data))
}

/**
 * 获取存储项（非响应式，自动检查过期）
 * @param {string} key - 键名
 * @param {*} defaultValue - 默认值
 * @param {Storage} storage - 存储类型，默认localStorage
 * @returns {*} 存储的值
 */
const getItem = (key, defaultValue = null, storage = localStorage) => {
  const item = storage.getItem(key)
  if (!item) return defaultValue

  try {
    const data = JSON.parse(item)

    // 检查是否过期
    if (data.expire && data.expire < Date.now()) {
      storage.removeItem(key)
      return defaultValue
    }

    return data.value
  } catch {
    // 如果不是 JSON 格式，直接返回原值
    return item
  }
}

/**
 * 检查存储项是否存在
 * @param {string} key - 键名
 * @param {Storage} storage - 存储类型，默认localStorage
 * @returns {boolean} 是否存在
 */
const hasItem = (key, storage = localStorage) => {
  return storage.getItem(key) !== null
}

/**
 * 获取所有键名
 * @param {Storage} storage - 存储类型，默认localStorage
 * @returns {Array} 键名数组
 */
const getKeys = (storage = localStorage) => {
  return Object.keys(storage)
}

/**
 * 获取存储大小（字节）
 * @param {Storage} storage - 存储类型，默认localStorage
 * @returns {number} 存储大小
 */
const getSize = (storage = localStorage) => {
  let size = 0
  for (const key in storage) {
    if (storage.hasOwnProperty(key)) {
      size += storage[key].length + key.length
    }
  }
  return size
}

/**
 * 清理所有过期项
 * @param {Storage} storage - 存储类型，默认localStorage
 * @returns {number} 清理的项数
 */
const removeExpired = (storage = localStorage) => {
  let count = 0
  const keys = Object.keys(storage)

  keys.forEach((key) => {
    try {
      const data = JSON.parse(storage.getItem(key))
      if (data.expire && data.expire < Date.now()) {
        storage.removeItem(key)
        count++
      }
    } catch {
      // 忽略非 JSON 格式的项
    }
  })

  return count
}

/**
 * 存储管理工具类
 */
export const storageUtils = {
  useLocalStorageWrapper,
  useSessionStorageWrapper,
  setItem,
  getItem,
  hasItem,
  getKeys,
  getSize,
  removeStorageItem,
  clearStorage,
  removeExpired,
}

export default storageUtils

