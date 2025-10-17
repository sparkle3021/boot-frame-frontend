/**
 * 添加类名
 * @param {Element} element - DOM 元素
 * @param {string} className - 类名
 */
const addClass = (element, className) => {
  if (!element) return
  element.classList.add(className)
}

/**
 * 移除类名
 * @param {Element} element - DOM 元素
 * @param {string} className - 类名
 */
const removeClass = (element, className) => {
  if (!element) return
  element.classList.remove(className)
}

/**
 * 切换类名
 * @param {Element} element - DOM 元素
 * @param {string} className - 类名
 */
const toggleClass = (element, className) => {
  if (!element) return
  element.classList.toggle(className)
}

/**
 * 检查是否有类名
 * @param {Element} element - DOM 元素
 * @param {string} className - 类名
 * @returns {boolean} 是否有该类名
 */
const hasClass = (element, className) => {
  return element ? element.classList.contains(className) : false
}

/**
 * 获取样式
 * @param {Element} element - DOM 元素
 * @param {string} property - 样式属性
 * @returns {string} 样式值
 */
const getStyle = (element, property) => {
  if (!element) return ''
  return window.getComputedStyle(element)[property]
}

/**
 * 设置样式
 * @param {Element} element - DOM 元素
 * @param {Object|string} property - 样式属性对象或属性名
 * @param {string} value - 样式值（当 property 为字符串时）
 */
const setStyle = (element, property, value) => {
  if (!element) return

  if (typeof property === 'object') {
    Object.keys(property).forEach((key) => {
      element.style[key] = property[key]
    })
  } else {
    element.style[property] = value
  }
}

/**
 * 获取元素位置
 * @param {Element} element - DOM 元素
 * @returns {Object} 位置对象 {top, left, right, bottom, width, height}
 */
const getOffset = (element) => {
  if (!element) return null

  const rect = element.getBoundingClientRect()
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
    right: rect.right + window.pageXOffset,
    bottom: rect.bottom + window.pageYOffset,
    width: rect.width,
    height: rect.height,
  }
}

/**
 * 判断元素是否在视口内
 * @param {Element} element - DOM 元素
 * @returns {boolean} 是否在视口内
 */
const isInViewport = (element) => {
  if (!element) return false

  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * 查找最近的父元素
 * @param {Element} element - DOM 元素
 * @param {string} selector - 选择器
 * @returns {Element|null} 找到的父元素
 */
const closest = (element, selector) => {
  if (!element) return null
  return element.closest(selector)
}

/**
 * 获取兄弟元素
 * @param {Element} element - DOM 元素
 * @returns {Array} 兄弟元素数组
 */
const siblings = (element) => {
  if (!element || !element.parentNode) return []

  return Array.from(element.parentNode.children).filter((child) => child !== element)
}

/**
 * 在元素后插入
 * @param {Element} newElement - 新元素
 * @param {Element} targetElement - 目标元素
 */
const insertAfter = (newElement, targetElement) => {
  if (!newElement || !targetElement || !targetElement.parentNode) return

  targetElement.parentNode.insertBefore(newElement, targetElement.nextSibling)
}

/**
 * 在元素前插入
 * @param {Element} newElement - 新元素
 * @param {Element} targetElement - 目标元素
 */
const insertBefore = (newElement, targetElement) => {
  if (!newElement || !targetElement || !targetElement.parentNode) return

  targetElement.parentNode.insertBefore(newElement, targetElement)
}

/**
 * DOM 操作工具类
 */
export const domUtils = {
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  getStyle,
  setStyle,
  getOffset,
  isInViewport,
  closest,
  siblings,
  insertAfter,
  insertBefore,
}

export default domUtils

