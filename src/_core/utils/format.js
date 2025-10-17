/**
 * 数字格式化（添加千分位）
 * @param {number|string} number - 数字
 * @param {number} decimals - 小数位数，默认2
 * @returns {string} 格式化后的数字
 */
const formatNumber = (number, decimals = 2) => {
  const num = Number(number)
  if (isNaN(num)) return '0'

  const parts = num.toFixed(decimals).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return parts.join('.')
}

/**
 * 金额格式化
 * @param {number|string} amount - 金额
 * @param {string} symbol - 货币符号，默认 '¥'
 * @param {number} decimals - 小数位数，默认 2
 * @returns {string} 格式化后的金额
 */
const formatMoney = (amount, symbol = '¥', decimals = 2) => {
  return `${symbol}${formatNumber(amount, decimals)}`
}

/**
 * 百分比格式化
 * @param {number|string} value - 数值（0-1 或 0-100）
 * @param {number} decimals - 小数位数，默认 2
 * @param {boolean} isDecimal - 是否为小数形式（0-1），默认 true
 * @returns {string} 格式化后的百分比
 */
const formatPercent = (value, decimals = 2, isDecimal = true) => {
  const num = Number(value)
  if (isNaN(num)) return '0%'

  const percent = isDecimal ? num * 100 : num
  return `${percent.toFixed(decimals)}%`
}

/**
 * 文件大小格式化
 * @param {number} bytes - 字节数
 * @param {number} decimals - 小数位数，默认 2
 * @returns {string} 格式化后的文件大小
 */
const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 B'

  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`
}

/**
 * 时长格式化（秒转时分秒）
 * @param {number} seconds - 秒数
 * @param {boolean} showHours - 是否显示小时，默认 true
 * @returns {string} 格式化后的时长，如 "01:23:45"
 */
const formatDuration = (seconds, showHours = true) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)

  const parts = []
  if (showHours || h > 0) {
    parts.push(String(h).padStart(2, '0'))
  }
  parts.push(String(m).padStart(2, '0'))
  parts.push(String(s).padStart(2, '0'))

  return parts.join(':')
}

/**
 * 银行卡号格式化（每4位一组）
 * @param {string} cardNumber - 银行卡号
 * @param {string} separator - 分隔符，默认空格
 * @returns {string} 格式化后的银行卡号
 */
const formatBankCard = (cardNumber, separator = ' ') => {
  const cleaned = cardNumber.replace(/\s+/g, '')
  return cleaned.replace(/(\d{4})/g, `$1${separator}`).trim()
}

/**
 * 解析格式化的数字（移除千分位等格式）
 * @param {string} formattedNumber - 格式化后的数字
 * @returns {number} 原始数字
 */
const parseNumber = (formattedNumber) => {
  const cleaned = String(formattedNumber).replace(/[,\s¥$€£]/g, '')
  return Number(cleaned)
}

/**
 * 数字转中文数字
 * @param {number} num - 数字（0-9999）
 * @returns {string} 中文数字
 */
const toChineseNumber = (num) => {
  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const units = ['', '十', '百', '千']

  if (num === 0) return digits[0]
  if (num < 10) return digits[num]

  let result = ''
  let n = num
  let unitIndex = 0

  while (n > 0) {
    const digit = n % 10
    if (digit !== 0) {
      result = digits[digit] + units[unitIndex] + result
    } else if (result && result[0] !== digits[0]) {
      result = digits[0] + result
    }
    n = Math.floor(n / 10)
    unitIndex++
  }

  // 处理 "一十" 的情况
  if (result.startsWith('一十')) {
    result = result.substring(1)
  }

  return result
}

/**
 * 数字转中文金额大写
 * @param {number} amount - 金额
 * @returns {string} 中文金额大写
 */
const toChineseMoney = (amount) => {
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const units = ['', '拾', '佰', '仟']
  const bigUnits = ['', '万', '亿']

  if (amount === 0) return '零元整'

  const [intPart, decPart] = String(amount.toFixed(2)).split('.')

  let result = ''
  let zeroCount = 0

  // 处理整数部分
  for (let i = 0; i < intPart.length; i++) {
    const digit = parseInt(intPart[i])
    const unitIndex = (intPart.length - 1 - i) % 4
    const bigUnitIndex = Math.floor((intPart.length - 1 - i) / 4)

    if (digit === 0) {
      zeroCount++
    } else {
      if (zeroCount > 0) {
        result += digits[0]
      }
      result += digits[digit] + units[unitIndex]
      zeroCount = 0
    }

    if (unitIndex === 0 && bigUnitIndex > 0) {
      result += bigUnits[bigUnitIndex]
    }
  }

  result += '元'

  // 处理小数部分
  if (decPart) {
    const jiao = parseInt(decPart[0])
    const fen = parseInt(decPart[1])

    if (jiao > 0) {
      result += digits[jiao] + '角'
    }
    if (fen > 0) {
      result += digits[fen] + '分'
    }
    if (jiao === 0 && fen === 0) {
      result += '整'
    }
  } else {
    result += '整'
  }

  return result
}

/**
 * 格式化工具类
 */
export const formatUtils = {
  formatNumber,
  formatMoney,
  formatPercent,
  formatFileSize,
  formatDuration,
  formatBankCard,
  parseNumber,
  toChineseNumber,
  toChineseMoney,
}

export default formatUtils

