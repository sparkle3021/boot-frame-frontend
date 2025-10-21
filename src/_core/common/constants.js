/**
 * 系统常量配置
 * @description HTTP 请求相关的系统级常量
 */
export const SYS_CONSTANTS = {
  /** HTTP 请求超时时间（毫秒） */
  REQUEST_TIMEOUT: 6000,

  /** HTTP 请求默认 Content-Type */
  REQUEST_CONTENT_TYPE: 'application/json;charset=utf-8',

  /** HTTP 请求头中的 Token 字段名 */
  REQUEST_TOKEN_KEY: 'Authorization',

  /** 本地存储中的 Token 键名 */
  LOCAL_TOKEN_KEY: 'token',
}

/**
 * 应用常量配置
 * @description 应用级别的静态常量
 * @note 应用名称等动态配置建议使用环境变量 import.meta.env.VITE_APP_TITLE
 */
export const APP_CONSTANTS = {
  // 预留应用级常量
}
