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

/**
 * 转短横线命名（kebab-case）
 * @param {string} str - 输入字符串
 * @returns {string} 短横线命名字符串
 */
const toKebabCase = (str) => {
  if (!str || typeof str !== 'string') return ''
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

/**
 * 转下划线命名（snake_case）
 * @param {string} str - 输入字符串
 * @returns {string} 下划线命名字符串
 */
const toSnakeCase = (str) => {
  if (!str || typeof str !== 'string') return ''
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()
}

/**
 * 转帕斯卡命名（PascalCase）
 * @param {string} str - 输入字符串
 * @param {string} separator - 分隔符，默认'-'
 * @returns {string} 帕斯卡命名字符串
 */
const toPascalCase = (str, separator = '-') => {
  if (!str || typeof str !== 'string') return ''
  return str
    .split(separator)
    .map((word) => capitalize(word))
    .join('')
}

/**
 * 移除空格
 * @param {string} str - 输入字符串
 * @param {string} type - 类型，'all'（全部）、'trim'（首尾）、'middle'（中间），默认 'all'
 * @returns {string} 处理后的字符串
 */
const removeSpaces = (str, type = 'all') => {
  if (!str || typeof str !== 'string') return ''

  switch (type) {
    case 'trim':
      return str.trim()
    case 'middle':
      return str.replace(/\s+/g, '')
    case 'all':
    default:
      return str.replace(/\s/g, '')
  }
}

/**
 * 反转字符串
 * @param {string} str - 输入字符串
 * @returns {string} 反转后的字符串
 */
const reverse = (str) => {
  if (!str || typeof str !== 'string') return ''
  return str.split('').reverse().join('')
}

/**
 * 生成随机字符串
 * @param {number} length - 长度
 * @param {string} chars - 字符集，默认包含字母和数字
 * @returns {string} 随机字符串
 */
const randomString = (length, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 隐藏邮箱
 * @param {string} email - 邮箱地址
 * @param {number} start - 保留前几位，默认 3
 * @param {string} mask - 掩码字符，默认 '***'
 * @returns {string} 隐藏后的邮箱
 */
const maskEmail = (email, start = 3, mask = '***') => {
  if (!email || typeof email !== 'string') return ''

  const [local, domain] = email.split('@')
  if (!domain) return email

  return local.substring(0, start) + mask + '@' + domain
}

/**
 * 隐藏身份证号
 * @param {string} idCard - 身份证号
 * @param {number} start - 开始位置，默认 6
 * @param {number} end - 结束位置，默认 14
 * @param {string} mask - 掩码字符，默认 '****'
 * @returns {string} 隐藏后的身份证号
 */
const maskIdCard = (idCard, start = 6, end = 14, mask = '****') => {
  if (!idCard || typeof idCard !== 'string') return ''
  return idCard.substring(0, start) + mask + idCard.substring(end)
}

/**
 * 高亮关键词
 * @param {string} text - 文本
 * @param {string} keyword - 关键词
 * @param {string} className - CSS类名，默认 'highlight'
 * @returns {string} 带高亮标签的 HTML 字符串
 */
const highlightKeyword = (text, keyword, className = 'highlight') => {
  if (!text || !keyword) return text

  const regex = new RegExp(`(${keyword})`, 'gi')
  return text.replace(regex, `<span class="${className}">$1</span>`)
}

/**
 * 固定宽度（补零或补空格）
 * @param {string|number} str - 输入字符串或数字
 * @param {number} width - 目标宽度
 * @param {string} char - 填充字符，默认 '0'
 * @param {string} position - 填充位置，'start' 或 'end'，默认 'start'
 * @returns {string} 固定宽度的字符串
 */
const toFixedWidth = (str, width, char = '0', position = 'start') => {
  const text = String(str)
  if (text.length >= width) return text

  const padding = char.repeat(width - text.length)
  return position === 'start' ? padding + text : text + padding
}

/**
 * 字符串处理工具类
 */
export const stringUtils = {
  capitalize,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  toPascalCase,
  truncate,
  maskPhone,
  maskEmail,
  maskIdCard,
  removeSpaces,
  reverse,
  randomString,
  highlightKeyword,
  toFixedWidth,
}

export default stringUtils

