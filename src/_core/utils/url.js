/**
 * 解析 URL
 * @param {string} url - URL 字符串
 * @returns {Object} 解析后的 URL 对象
 */
const parseUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return {
      protocol: urlObj.protocol.replace(':', ''),
      host: urlObj.host,
      hostname: urlObj.hostname,
      port: urlObj.port,
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash.replace('#', ''),
      origin: urlObj.origin,
      href: urlObj.href,
      params: getQueryParams(url),
    }
  } catch (error) {
    console.error('Invalid URL:', error)
    return null
  }
}

/**
 * 构建 URL
 * @param {Object} options - URL 配置
 * @returns {string} 构建的 URL
 */
const stringifyUrl = (options) => {
  const { protocol = 'https', host, pathname = '', params = {}, hash = '' } = options

  let url = `${protocol}://${host}${pathname}`

  const queryString = new URLSearchParams(params).toString()
  if (queryString) {
    url += `?${queryString}`
  }

  if (hash) {
    url += `#${hash}`
  }

  return url
}

/**
 * 获取查询参数
 * @param {string} url - URL 字符串，默认为当前页面 URL
 * @returns {Object} 查询参数对象
 */
const getQueryParams = (url) => {
  const urlStr = url || window.location.href
  const searchParams = new URL(urlStr).searchParams
  const params = {}

  searchParams.forEach((value, key) => {
    params[key] = value
  })

  return params
}

/**
 * 获取单个查询参数
 * @param {string} key - 参数键名
 * @param {string} url - URL 字符串，默认为当前页面 URL
 * @returns {string|null} 参数值
 */
const getQueryParam = (key, url) => {
  const params = getQueryParams(url)
  return params[key] || null
}

/**
 * 添加查询参数
 * @param {string} url - URL 字符串
 * @param {Object} params - 要添加的参数
 * @returns {string} 新的 URL
 */
const addQueryParams = (url, params) => {
  const urlObj = new URL(url)

  Object.keys(params).forEach((key) => {
    urlObj.searchParams.set(key, params[key])
  })

  return urlObj.toString()
}

/**
 * 移除查询参数
 * @param {string} url - URL 字符串
 * @param {Array|string} keys - 要移除的参数键名
 * @returns {string} 新的 URL
 */
const removeQueryParams = (url, keys) => {
  const urlObj = new URL(url)
  const keyArray = Array.isArray(keys) ? keys : [keys]

  keyArray.forEach((key) => {
    urlObj.searchParams.delete(key)
  })

  return urlObj.toString()
}

/**
 * 更新查询参数
 * @param {string} url - URL 字符串
 * @param {Object} params - 要更新的参数
 * @returns {string} 新的 URL
 */
const updateQueryParams = (url, params) => {
  return addQueryParams(url, params)
}

/**
 * 获取 Hash 参数
 * @param {string} url - URL 字符串，默认为当前页面 URL
 * @returns {Object} Hash 参数对象
 */
const getHashParams = (url) => {
  const urlStr = url || window.location.href
  const hash = new URL(urlStr).hash.substring(1)

  if (!hash) return {}

  const params = {}
  hash.split('&').forEach((pair) => {
    const [key, value] = pair.split('=')
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '')
    }
  })

  return params
}

/**
 * 判断是否为绝对路径
 * @param {string} path - 路径
 * @returns {boolean} 是否为绝对路径
 */
const isAbsoluteUrl = (path) => {
  return /^https?:\/\//i.test(path)
}

/**
 * 拼接 URL
 * @param {...string} paths - 路径片段
 * @returns {string} 拼接后的 URL
 */
const joinUrl = (...paths) => {
  return paths
    .map((path, index) => {
      if (index === 0) {
        return path.replace(/\/+$/, '')
      }
      return path.replace(/^\/+|\/+$/g, '')
    })
    .filter((path) => path)
    .join('/')
}

/**
 * 下载文件
 * @param {string} url - 文件 URL
 * @param {string} filename - 文件名，可选
 * @returns {void}
 */
const downloadFile = (url, filename) => {
  const link = document.createElement('a')
  link.href = url
  if (filename) {
    link.download = filename
  }
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * URL 处理工具类
 */
export const urlUtils = {
  parseUrl,
  stringifyUrl,
  getQueryParams,
  getQueryParam,
  addQueryParams,
  removeQueryParams,
  updateQueryParams,
  getHashParams,
  isAbsoluteUrl,
  joinUrl,
  downloadFile,
}

export default urlUtils

