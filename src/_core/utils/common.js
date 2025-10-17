import { useClipboard } from '@vueuse/core'

/**
 * 剪贴板操作
 * @returns {Object} 剪贴板相关方法
 */
const useClipboardWrapper = () => {
  return useClipboard()
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} 是否复制成功
 */
const copyToClipboard = async (text) => {
  const { copy, isSupported } = useClipboard()
  if (!isSupported) {
    console.error('Clipboard API is not supported')
    return false
  }
  await copy(text)
  return true
}

/**
 * 获取设备信息
 * @returns {Object} 设备信息对象
 */
const getDeviceInfo = () => {
  const ua = navigator.userAgent
  return {
    isMobile: /Mobile|Android|iPhone/i.test(ua),
    isIOS: /iPhone|iPad|iPod/i.test(ua),
    isAndroid: /Android/i.test(ua),
    isWechat: /MicroMessenger/i.test(ua),
    isTablet: /iPad|Android(?!.*Mobile)/i.test(ua),
  }
}

/**
 * 获取浏览器信息
 * @returns {Object} 浏览器信息对象
 */
const getBrowserInfo = () => {
  const ua = navigator.userAgent
  const browsers = {
    Chrome: /Chrome\/(\d+)/,
    Firefox: /Firefox\/(\d+)/,
    Safari: /Version\/(\d+).*Safari/,
    Edge: /Edg\/(\d+)/,
    IE: /MSIE (\d+)|Trident.*rv:(\d+)/,
  }

  for (const [name, regex] of Object.entries(browsers)) {
    const match = ua.match(regex)
    if (match) {
      return {
        name,
        version: match[1] || match[2] || 'unknown',
      }
    }
  }

  return { name: 'Unknown', version: 'unknown' }
}

/**
 * 判断是否为 iOS 设备
 * @returns {boolean} 是否为 iOS
 */
const isIOS = () => {
  return getDeviceInfo().isIOS
}

/**
 * 判断是否为 Android 设备
 * @returns {boolean} 是否为 Android
 */
const isAndroid = () => {
  return getDeviceInfo().isAndroid
}

/**
 * 判断是否为移动端
 * @returns {boolean} 是否为移动端
 */
const isMobile = () => {
  return getDeviceInfo().isMobile
}

/**
 * 判断是否在微信浏览器中
 * @returns {boolean} 是否在微信中
 */
const isWechat = () => {
  return getDeviceInfo().isWechat
}

/**
 * 获取视口尺寸
 * @returns {Object} 视口宽高
 */
const getViewportSize = () => {
  return {
    width: window.innerWidth || document.documentElement.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight,
  }
}

/**
 * 平滑滚动到指定位置
 * @param {number} top - 目标位置
 * @param {number} duration - 动画时长（毫秒），默认 300
 */
const scrollTo = (top, duration = 300) => {
  const start = window.pageYOffset
  const distance = top - start
  const startTime = Date.now()

  const scroll = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 缓动函数
    const easeProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

    window.scrollTo(0, start + distance * easeProgress)

    if (progress < 1) {
      requestAnimationFrame(scroll)
    }
  }

  scroll()
}

/**
 * 滚动到顶部
 * @param {number} duration - 动画时长（毫秒），默认 300
 */
const scrollToTop = (duration = 300) => {
  scrollTo(0, duration)
}

/**
 * 滚动到元素
 * @param {Element|string} element - 元素或选择器
 * @param {number} offset - 偏移量，默认 0
 * @param {number} duration - 动画时长（毫秒），默认 300
 */
const scrollToElement = (element, offset = 0, duration = 300) => {
  const el = typeof element === 'string' ? document.querySelector(element) : element
  if (!el) return

  const top = el.getBoundingClientRect().top + window.pageYOffset + offset
  scrollTo(top, duration)
}

/**
 * 全屏控制
 * @param {Element} element - 要全屏的元素，默认为 document.documentElement
 * @param {boolean} enter - 是否进入全屏，true 进入，false 退出
 */
const fullscreen = (element = document.documentElement, enter = true) => {
  if (enter) {
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
  }
}

/**
 * 浏览器相关工具类
 */
export const browserUtils = {
  useClipboardWrapper,
  copyToClipboard,
  getDeviceInfo,
  getBrowserInfo,
  isIOS,
  isAndroid,
  isMobile,
  isWechat,
  getViewportSize,
  scrollTo,
  scrollToTop,
  scrollToElement,
  fullscreen,
}

export default browserUtils

