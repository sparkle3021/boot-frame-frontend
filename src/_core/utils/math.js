/**
 * 生成指定范围的随机数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @param {number} decimals - 小数位数，默认 0
 * @returns {number} 随机数
 */
const random = (min, max, decimals = 0) => {
  const num = Math.random() * (max - min) + min
  return decimals > 0 ? Number(num.toFixed(decimals)) : Math.floor(num)
}

/**
 * 生成指定范围的随机整数
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 随机整数
 */
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 限制数值范围
 * @param {number} value - 数值
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number} 限制后的数值
 */
const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}

/**
 * 数组求和
 * @param {Array<number>} numbers - 数字数组
 * @returns {number} 总和
 */
const sum = (numbers) => {
  return numbers.reduce((acc, num) => acc + num, 0)
}

/**
 * 计算平均值
 * @param {Array<number>} numbers - 数字数组
 * @returns {number} 平均值
 */
const average = (numbers) => {
  return numbers.length > 0 ? sum(numbers) / numbers.length : 0
}

/**
 * 求最大值
 * @param {Array<number>} numbers - 数字数组
 * @returns {number} 最大值
 */
const max = (numbers) => {
  return Math.max(...numbers)
}

/**
 * 求最小值
 * @param {Array<number>} numbers - 数字数组
 * @returns {number} 最小值
 */
const min = (numbers) => {
  return Math.min(...numbers)
}

/**
 * 精确舍入
 * @param {number} value - 数值
 * @param {number} decimals - 小数位数
 * @param {string} method - 舍入方式，'round'/'ceil'/'floor'，默认 'round'
 * @returns {number} 舍入后的数值
 */
const round = (value, decimals = 0, method = 'round') => {
  const multiplier = Math.pow(10, decimals)
  const num = value * multiplier

  let result
  switch (method) {
    case 'ceil':
      result = Math.ceil(num)
      break
    case 'floor':
      result = Math.floor(num)
      break
    case 'round':
    default:
      result = Math.round(num)
  }

  return result / multiplier
}

/**
 * 保留小数位
 * @param {number} value - 数值
 * @param {number} decimals - 小数位数
 * @returns {string} 格式化后的字符串
 */
const toFixed = (value, decimals = 2) => {
  return Number(value).toFixed(decimals)
}

/**
 * 计算百分比
 * @param {number} part - 部分值
 * @param {number} total - 总值
 * @param {number} decimals - 小数位数，默认 2
 * @returns {number} 百分比（0-100）
 */
const percentage = (part, total, decimals = 2) => {
  if (total === 0) return 0
  return round((part / total) * 100, decimals)
}

/**
 * 数学计算工具类
 */
export const mathUtils = {
  random,
  randomInt,
  clamp,
  sum,
  average,
  max,
  min,
  round,
  toFixed,
  percentage,
}

export default mathUtils

