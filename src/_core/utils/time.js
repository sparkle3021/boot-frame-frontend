import { useDateFormat, useNow } from '@vueuse/core'

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

/**
 * 日期加减运算
 * @param {Date|string|number} date - 日期
 * @param {number} amount - 数量
 * @param {string} unit - 单位，'day', 'month', 'year', 'hour', 'minute', 'second'
 * @returns {Date} 计算后的日期
 */
const addTime = (date, amount, unit = 'day') => {
  const result = new Date(date)

  switch (unit) {
    case 'year':
      result.setFullYear(result.getFullYear() + amount)
      break
    case 'month':
      result.setMonth(result.getMonth() + amount)
      break
    case 'day':
      result.setDate(result.getDate() + amount)
      break
    case 'hour':
      result.setHours(result.getHours() + amount)
      break
    case 'minute':
      result.setMinutes(result.getMinutes() + amount)
      break
    case 'second':
      result.setSeconds(result.getSeconds() + amount)
      break
  }

  return result
}

/**
 * 判断是否为今天
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否为今天
 */
const isToday = (date) => {
  const target = new Date(date)
  const today = new Date()
  return (
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth() &&
    target.getDate() === today.getDate()
  )
}

/**
 * 判断是否为本周
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否为本周
 */
const isThisWeek = (date) => {
  const target = new Date(date)
  const today = new Date()

  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 7)

  return target >= startOfWeek && target < endOfWeek
}

/**
 * 判断是否为本月
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否为本月
 */
const isThisMonth = (date) => {
  const target = new Date(date)
  const today = new Date()
  return (
    target.getFullYear() === today.getFullYear() && target.getMonth() === today.getMonth()
  )
}

/**
 * 判断是否为工作日
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否为工作日
 */
const isWeekday = (date) => {
  const day = new Date(date).getDay()
  return day >= 1 && day <= 5
}

/**
 * 判断是否为周末
 * @param {Date|string|number} date - 日期
 * @returns {boolean} 是否为周末
 */
const isWeekend = (date) => {
  const day = new Date(date).getDay()
  return day === 0 || day === 6
}

/**
 * 日期比较
 * @param {Date|string|number} date1 - 日期1
 * @param {Date|string|number} date2 - 日期2
 * @returns {number} date1 < date2 返回 -1，相等返回 0，date1 > date2 返回 1
 */
const compareDate = (date1, date2) => {
  const d1 = new Date(date1).getTime()
  const d2 = new Date(date2).getTime()

  if (d1 < d2) return -1
  if (d1 > d2) return 1
  return 0
}

/**
 * 判断 date1 是否在 date2 之前
 * @param {Date|string|number} date1 - 日期1
 * @param {Date|string|number} date2 - 日期2
 * @returns {boolean} 是否在之前
 */
const isBefore = (date1, date2) => {
  return new Date(date1).getTime() < new Date(date2).getTime()
}

/**
 * 判断 date1 是否在 date2 之后
 * @param {Date|string|number} date1 - 日期1
 * @param {Date|string|number} date2 - 日期2
 * @returns {boolean} 是否在之后
 */
const isAfter = (date1, date2) => {
  return new Date(date1).getTime() > new Date(date2).getTime()
}

/**
 * 判断两个日期是否相同（精确到日）
 * @param {Date|string|number} date1 - 日期1
 * @param {Date|string|number} date2 - 日期2
 * @returns {boolean} 是否相同
 */
const isSameDay = (date1, date2) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

/**
 * 获取季度
 * @param {Date|string|number} date - 日期
 * @returns {number} 季度（1-4）
 */
const getQuarter = (date) => {
  const month = new Date(date).getMonth()
  return Math.floor(month / 3) + 1
}

/**
 * 获取年份的第几周
 * @param {Date|string|number} date - 日期
 * @returns {number} 周数
 */
const getWeekOfYear = (date) => {
  const target = new Date(date)
  const startOfYear = new Date(target.getFullYear(), 0, 1)
  const diff = target - startOfYear
  const oneWeek = 1000 * 60 * 60 * 24 * 7
  return Math.ceil(diff / oneWeek)
}

/**
 * 计算时间差（返回详细对象）
 * @param {Date|string|number} date1 - 开始时间
 * @param {Date|string|number} date2 - 结束时间
 * @returns {Object} 时间差对象，包含 days, hours, minutes, seconds
 */
const timeDiff = (date1, date2) => {
  const diff = Math.abs(new Date(date2) - new Date(date1))

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, totalMilliseconds: diff }
}

/**
 * 时间处理工具类
 */
export const timeUtils = {
  formatDate,
  getRelativeTime,
  useCurrentTime,
  addTime,
  isToday,
  isThisWeek,
  isThisMonth,
  isWeekday,
  isWeekend,
  compareDate,
  isBefore,
  isAfter,
  isSameDay,
  getQuarter,
  getWeekOfYear,
  timeDiff,
}

export default timeUtils

