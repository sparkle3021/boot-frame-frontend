import { ElMessage } from 'element-plus'

// 判断是否为函数
const isFunction = (value) => typeof value === 'function'
const messageType = ['info', 'success', 'warning', 'error']

function messageTypeProcess(type) {
  return messageType.includes(type) ? type : 'primary'
}

/**
 * `Message` 消息提示函数
 * @param {string|VNode|Function} message - 消息内容，可以是字符串、VNode 或返回 VNode 的函数
 * @param {Object} params - 配置参数
 * @param {string} [params.type='info'] - 消息类型，可选 `info` 、`success` 、`warning` 、`error` ，默认 `info`
 * @param {boolean} [params.plain=false] - 是否纯色，默认 `false`
 * @param {any} [params.icon] - 自定义图标，该属性会覆盖 `type` 的图标
 * @param {boolean} [params.dangerouslyUseHTMLString=false] - 是否将 `message` 属性作为 `HTML` 片段处理，默认 `false`
 * @param {string} [params.customClass='antd'] - 消息风格，可选 `el` 、`antd` ，默认 `antd`
 * @param {number} [params.duration=2000] - 显示时间，单位为毫秒。设为 `0` 则不会自动关闭，`element-plus` 默认是 `3000` ，平台改成默认 `2000`
 * @param {boolean} [params.showClose=false] - 是否显示关闭按钮，默认值 `false`
 * @param {number} [params.offset=16] - `Message` 距离窗口顶部的偏移量，默认 `16`
 * @param {string|HTMLElement} [params.appendTo=document.body] - 设置组件的根元素，默认 `document.body`
 * @param {boolean} [params.grouping=true] - 合并内容相同的消息，不支持 `VNode` 类型的消息，默认值 `true`
 * @param {number} [params.repeatNum=1] - 重复次数，类似于 `Badge` 。当和 `grouping` 属性一起使用时作为初始数量使用，默认值 `1`
 * @param {Function|null} [params.onClose] - 关闭时的回调函数, 参数为被关闭的 `message` 实例
 * @returns {MessageHandler} - 消息实例
 */
const message = (message, params = {}) => {
  const {
    type = 'primary',
    plain = false,
    icon,
    dangerouslyUseHTMLString = false,
    customClass = 'antd',
    duration = 1000,
    showClose = false,
    offset = 16,
    appendTo = document.body,
    grouping = true,
    repeatNum = 1,
    onClose,
  } = params

  const options = {
    message,
    type: messageTypeProcess(type),
    plain,
    icon,
    dangerouslyUseHTMLString,
    duration,
    showClose,
    offset,
    appendTo,
    grouping,
    repeatNum,
    customClass: customClass === 'antd' ? 'antd-message' : '',
    onClose: isFunction(onClose) ? onClose : null,
  }

  return ElMessage(options)
}

/**
 * 快捷方法：info 类型消息
 * @param {string|VNode|Function} messageContent - 消息内容
 * @param {Object} params - 配置参数（可选）
 * @returns {MessageHandler}
 */
message.info = (messageContent, params) => {
  return message(messageContent, { ...params, type: 'primary' })
}

/**
 * 快捷方法：success 类型消息
 * @param {string|VNode|Function} messageContent - 消息内容
 * @param {Object} params - 配置参数（可选）
 * @returns {MessageHandler}
 */
message.success = (messageContent, params) => {
  return message(messageContent, { ...params, type: 'success' })
}

/**
 * 快捷方法：warning 类型消息
 * @param {string|VNode|Function} messageContent - 消息内容
 * @param {Object} params - 配置参数（可选）
 * @returns {MessageHandler}
 */
message.warning = (messageContent, params) => {
  return message(messageContent, { ...params, type: 'warning' })
}

/**
 * 快捷方法：error 类型消息
 * @param {string|VNode|Function} messageContent - 消息内容
 * @param {Object} params - 配置参数（可选）
 * @returns {MessageHandler}
 */
message.error = (messageContent, params) => {
  return message(messageContent, { ...params, type: 'error' })
}

/**
 * 关闭所有 `Message` 消息提示函数
 * @returns {void}
 */
const closeAllMessage = () => ElMessage.closeAll()

/**
 * 消息提示工具类
 */
export const messageUtils = {
  message,
  info: message.info,
  success: message.success,
  warning: message.warning,
  error: message.error,
  closeAll: closeAllMessage,
}

export { closeAllMessage, message }
export default messageUtils
