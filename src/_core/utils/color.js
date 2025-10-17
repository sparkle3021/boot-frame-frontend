/**
 * HEX 转 RGB
 * @param {string} hex - HEX 颜色值
 * @returns {Object} RGB 对象 {r, g, b}
 */
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * RGB 转 HEX
 * @param {number} r - 红色值（0-255）
 * @param {number} g - 绿色值（0-255）
 * @param {number} b - 蓝色值（0-255）
 * @returns {string} HEX 颜色值
 */
const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
}

/**
 * HEX 转 RGBA
 * @param {string} hex - HEX 颜色值
 * @param {number} alpha - 透明度（0-1）
 * @returns {string} RGBA 字符串
 */
const hexToRgba = (hex, alpha = 1) => {
  const rgb = hexToRgb(hex)
  return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})` : null
}

/**
 * 颜色变浅
 * @param {string} hex - HEX 颜色值
 * @param {number} amount - 变浅程度（0-1）
 * @returns {string} 新的 HEX 颜色值
 */
const lighten = (hex, amount) => {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  const increase = (value) => Math.min(255, Math.round(value + (255 - value) * amount))

  return rgbToHex(increase(rgb.r), increase(rgb.g), increase(rgb.b))
}

/**
 * 颜色变深
 * @param {string} hex - HEX 颜色值
 * @param {number} amount - 变深程度（0-1）
 * @returns {string} 新的 HEX 颜色值
 */
const darken = (hex, amount) => {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  const decrease = (value) => Math.max(0, Math.round(value * (1 - amount)))

  return rgbToHex(decrease(rgb.r), decrease(rgb.g), decrease(rgb.b))
}

/**
 * 生成随机颜色
 * @param {string} format - 格式，'hex' 或 'rgb'，默认 'hex'
 * @returns {string} 随机颜色
 */
const randomColor = (format = 'hex') => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  return format === 'rgb' ? `rgb(${r}, ${g}, ${b})` : rgbToHex(r, g, b)
}

/**
 * 验证颜色值
 * @param {string} color - 颜色值
 * @returns {boolean} 是否为有效颜色
 */
const isValidColor = (color) => {
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  const rgbPattern = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/
  const rgbaPattern = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/

  return hexPattern.test(color) || rgbPattern.test(color) || rgbaPattern.test(color)
}

/**
 * 颜色处理工具类
 */
export const colorUtils = {
  hexToRgb,
  rgbToHex,
  hexToRgba,
  lighten,
  darken,
  randomColor,
  isValidColor,
}

export default colorUtils

