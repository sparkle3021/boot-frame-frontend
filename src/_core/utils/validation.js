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

/**
 * 验证邮箱格式
 * @param {string} email - 邮箱地址
 * @returns {boolean} 是否为有效邮箱
 */
const isEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * 验证手机号（中国大陆）
 * @param {string} phone - 手机号码
 * @returns {boolean} 是否为有效手机号
 */
const isPhone = (phone) => {
  const regex = /^1[3-9]\d{9}$/
  return regex.test(phone)
}

/**
 * 验证身份证号（中国大陆，18位）
 * @param {string} idCard - 身份证号
 * @returns {boolean} 是否为有效身份证号
 */
const isIdCard = (idCard) => {
  const regex = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[0-9Xx]$/
  return regex.test(idCard)
}

/**
 * 验证 URL
 * @param {string} url - URL 地址
 * @returns {boolean} 是否为有效 URL
 */
const isUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * 验证 IP 地址（IPv4）
 * @param {string} ip - IP 地址
 * @returns {boolean} 是否为有效 IP
 */
const isIp = (ip) => {
  const regex =
    /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/
  return regex.test(ip)
}

/**
 * 验证是否为数字
 * @param {*} value - 要验证的值
 * @returns {boolean} 是否为数字
 */
const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

/**
 * 验证是否为整数
 * @param {*} value - 要验证的值
 * @returns {boolean} 是否为整数
 */
const isInteger = (value) => {
  return Number.isInteger(Number(value))
}

/**
 * 验证是否为正数
 * @param {*} value - 要验证的值
 * @returns {boolean} 是否为正数
 */
const isPositive = (value) => {
  return isNumeric(value) && Number(value) > 0
}

/**
 * 验证数值是否在指定范围内
 * @param {number} value - 要验证的值
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {boolean} 是否在范围内
 */
const isInRange = (value, min, max) => {
  const num = Number(value)
  return isNumeric(value) && num >= min && num <= max
}

/**
 * 验证密码强度（至少8位，包含大小写字母和数字）
 * @param {string} password - 密码
 * @returns {boolean} 是否满足强度要求
 */
const isStrongPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return regex.test(password)
}

/**
 * 验证是否为中文
 * @param {string} str - 字符串
 * @returns {boolean} 是否为中文
 */
const isChinese = (str) => {
  const regex = /^[\u4e00-\u9fa5]+$/
  return regex.test(str)
}

/**
 * 验证是否包含中文
 * @param {string} str - 字符串
 * @returns {boolean} 是否包含中文
 */
const hasChinese = (str) => {
  const regex = /[\u4e00-\u9fa5]/
  return regex.test(str)
}

/**
 * 验证是否为英文字母
 * @param {string} str - 字符串
 * @returns {boolean} 是否为英文字母
 */
const isEnglish = (str) => {
  const regex = /^[a-zA-Z]+$/
  return regex.test(str)
}

/**
 * 验证用户名格式（4-16位字母数字下划线）
 * @param {string} username - 用户名
 * @returns {boolean} 是否为有效用户名
 */
const isUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{4,16}$/
  return regex.test(username)
}

/**
 * 验证信用卡号（Luhn算法）
 * @param {string} cardNumber - 信用卡号
 * @returns {boolean} 是否为有效信用卡号
 */
const isCreditCard = (cardNumber) => {
  const regex = /^\d{13,19}$/
  if (!regex.test(cardNumber)) return false

  let sum = 0
  let isEven = false

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i])

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

/**
 * 判空处理工具类
 */
export const validationUtils = {
  // 判空方法
  isEmpty,
  isBlank,
  isEmptyDeep,
  // 格式验证
  isEmail,
  isPhone,
  isIdCard,
  isUrl,
  isIp,
  isCreditCard,
  // 数字验证
  isNumeric,
  isInteger,
  isPositive,
  isInRange,
  // 字符串验证
  isStrongPassword,
  isChinese,
  hasChinese,
  isEnglish,
  isUsername,
}

export default validationUtils

