/**
 * 通用工具函数统一导出入口
 * 
 * 该文件聚合所有工具模块，提供统一的导出接口
 * 各个功能模块已拆分至独立文件：
 * - time.js: 时间处理工具
 * - string.js: 字符串处理工具
 * - validation.js: 判空验证工具
 * - restrict.js: 防抖节流工具
 * - storage.js: 存储管理工具
 * - common.js: 浏览器相关工具
 * - cookie.js: Cookie 管理工具
 * - message.js: 消息提示工具
 * - format.js: 格式化工具
 * - array.js: 数组处理工具
 * - object.js: 对象处理工具
 * - url.js: URL 处理工具
 * - file.js: 文件处理工具
 * - dom.js: DOM 操作工具
 * - color.js: 颜色处理工具
 * - math.js: 数学计算工具
 */

// 导出各个工具模块
export { timeUtils } from './time'
export { stringUtils } from './string'
export { validationUtils } from './validation'
export { restrictUtils } from './restrict'
export { storageUtils } from './storage'
export { browserUtils } from './common'
export { cookieUtils } from './cookie'
export { messageUtils } from './message'
export { formatUtils } from './format'
export { arrayUtils } from './array'
export { objectUtils } from './object'
export { urlUtils } from './url'
export { fileUtils } from './file'
export { domUtils } from './dom'
export { colorUtils } from './color'
export { mathUtils } from './math'

// 导入所有工具模块
import { timeUtils } from './time'
import { stringUtils } from './string'
import { validationUtils } from './validation'
import { restrictUtils } from './restrict'
import { storageUtils } from './storage'
import { browserUtils } from './common'
import { cookieUtils } from './cookie'
import { messageUtils } from './message'
import { formatUtils } from './format'
import { arrayUtils } from './array'
import { objectUtils } from './object'
import { urlUtils } from './url'
import { fileUtils } from './file'
import { domUtils } from './dom'
import { colorUtils } from './color'
import { mathUtils } from './math'

// 直接导出所有工具方法（支持 import * as utils 方式）

// 时间处理
export const {
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
} = timeUtils

// 字符串处理
export const {
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
} = stringUtils

// 判空验证
export const {
  isEmpty,
  isBlank,
  isEmptyDeep,
  isEmail,
  isPhone,
  isIdCard,
  isUrl,
  isIp,
  isCreditCard,
  isNumeric,
  isInteger,
  isPositive,
  isInRange,
  isStrongPassword,
  isChinese,
  hasChinese,
  isEnglish,
  isUsername,
} = validationUtils

// 防抖节流
export const { debounce, throttle } = restrictUtils

// 存储管理
export const {
  useLocalStorageWrapper,
  useSessionStorageWrapper,
  setItem,
  getItem,
  hasItem,
  getKeys,
  getSize,
  removeStorageItem,
  clearStorage,
  removeExpired,
} = storageUtils

// 浏览器工具
export const {
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
} = browserUtils

// Cookie 管理
export const {
  useCookieWrapper,
  setCookie,
  getCookie,
  removeCookie,
  hasCookie,
  getAllCookies,
  clearAllCookies,
} = cookieUtils

// 消息提示
export const { message } = messageUtils

// 格式化工具
export const {
  formatNumber,
  formatMoney,
  formatPercent,
  formatFileSize,
  formatDuration,
  formatBankCard,
  parseNumber,
  toChineseNumber,
  toChineseMoney,
} = formatUtils

// 数组处理
export const {
  unique,
  flatten,
  chunk,
  shuffle,
  sample,
  groupBy,
  sortBy,
  difference,
  intersection,
  union,
  partition,
  compact,
  toTree,
  findTree,
  flattenTree,
} = arrayUtils

// 对象处理
export const {
  deepClone,
  deepMerge,
  isObject,
  pick,
  omit,
  get,
  set,
  has,
  flattenObject,
  unflattenObject,
  diffObject,
  deepFreeze,
} = objectUtils

// URL 处理
export const {
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
} = urlUtils

// 文件处理
export const {
  getFileExtension,
  getFileName,
  getFileType,
  isImage,
  isVideo,
  isAudio,
  validateFileSize,
  validateFileType,
  readFile,
  fileToBase64,
  base64ToFile,
  compressImage,
  downloadBlob,
} = fileUtils

// DOM 操作
export const {
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
} = domUtils

// 颜色处理
export const {
  hexToRgb,
  rgbToHex,
  hexToRgba,
  lighten,
  darken,
  randomColor,
  isValidColor,
} = colorUtils

// 数学计算
export const {
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
} = mathUtils
