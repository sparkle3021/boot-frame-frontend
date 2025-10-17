import { useCookie } from '@vueuse/core'

/**
 * 获取 Cookie 值（响应式）
 * @param {string} name - Cookie 名称
 * @param {Object} options - 配置选项
 * @returns {Object} 包含 value 的 ref 对象
 */
const useCookieWrapper = (name, options = {}) => {
  return useCookie(name, options)
}

/**
 * 设置 Cookie
 * @param {string} name - Cookie 名称
 * @param {string} value - Cookie 值
 * @param {Object} options - 配置选项
 * @param {number} options.maxAge - 最大生命周期（秒）
 * @param {Date} options.expires - 过期时间
 * @param {string} options.path - 路径，默认 '/'
 * @param {string} options.domain - 域名
 * @param {boolean} options.secure - 是否只在 HTTPS 传输
 * @param {string} options.sameSite - SameSite 属性
 */
const setCookie = (name, value, options = {}) => {
  const {
    maxAge,
    expires,
    path = '/',
    domain,
    secure,
    sameSite = 'Lax',
  } = options

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (maxAge !== undefined) {
    cookieString += `; Max-Age=${maxAge}`
  }

  if (expires) {
    cookieString += `; Expires=${expires.toUTCString()}`
  }

  cookieString += `; Path=${path}`

  if (domain) {
    cookieString += `; Domain=${domain}`
  }

  if (secure) {
    cookieString += '; Secure'
  }

  if (sameSite) {
    cookieString += `; SameSite=${sameSite}`
  }

  document.cookie = cookieString
}

/**
 * 获取 Cookie 值
 * @param {string} name - Cookie 名称
 * @returns {string|null} Cookie 值，不存在返回 null
 */
const getCookie = (name) => {
  const cookies = document.cookie.split('; ')
  const cookie = cookies.find((row) =>
    row.startsWith(`${encodeURIComponent(name)}=`),
  )

  if (cookie) {
    const value = cookie.split('=')[1]
    return decodeURIComponent(value)
  }

  return null
}

/**
 * 删除 Cookie
 * @param {string} name - Cookie 名称
 * @param {Object} options - 配置选项
 * @param {string} options.path - 路径，默认 '/'
 * @param {string} options.domain - 域名
 */
const removeCookie = (name, options = {}) => {
  setCookie(name, '', {
    ...options,
    maxAge: -1,
  })
}

/**
 * 检查 Cookie 是否存在
 * @param {string} name - Cookie 名称
 * @returns {boolean} 是否存在
 */
const hasCookie = (name) => {
  return getCookie(name) !== null
}

/**
 * 获取所有 Cookie
 * @returns {Object} 包含所有 Cookie 的对象
 */
const getAllCookies = () => {
  const cookies = {}
  const cookieArray = document.cookie.split('; ')

  cookieArray.forEach((cookie) => {
    if (cookie) {
      const [name, value] = cookie.split('=')
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value)
      }
    }
  })

  return cookies
}

/**
 * 清空所有 Cookie
 * @param {Object} options - 配置选项
 * @param {string} options.path - 路径
 * @param {string} options.domain - 域名
 */
const clearAllCookies = (options = {}) => {
  const cookies = getAllCookies()
  Object.keys(cookies).forEach((name) => {
    removeCookie(name, options)
  })
}

/**
 * Cookie 管理工具类
 */
export const cookieUtils = {
  useCookieWrapper,
  setCookie,
  getCookie,
  removeCookie,
  hasCookie,
  getAllCookies,
  clearAllCookies,
}

export default cookieUtils

