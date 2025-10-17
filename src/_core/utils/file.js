/**
 * 获取文件扩展名
 * @param {string} filename - 文件名
 * @returns {string} 扩展名（不含点）
 */
const getFileExtension = (filename) => {
  const lastDot = filename.lastIndexOf('.')
  return lastDot > 0 ? filename.substring(lastDot + 1).toLowerCase() : ''
}

/**
 * 获取文件名（不含扩展名）
 * @param {string} filename - 文件名
 * @returns {string} 文件名
 */
const getFileName = (filename) => {
  const lastDot = filename.lastIndexOf('.')
  return lastDot > 0 ? filename.substring(0, lastDot) : filename
}

/**
 * 获取文件类型
 * @param {string} filename - 文件名
 * @returns {string} 文件类型（image/video/audio/document/other）
 */
const getFileType = (filename) => {
  const ext = getFileExtension(filename)

  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
  const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm']
  const audioExts = ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac']
  const docExts = ['doc', 'docx', 'pdf', 'txt', 'xls', 'xlsx', 'ppt', 'pptx']

  if (imageExts.includes(ext)) return 'image'
  if (videoExts.includes(ext)) return 'video'
  if (audioExts.includes(ext)) return 'audio'
  if (docExts.includes(ext)) return 'document'
  return 'other'
}

/**
 * 判断是否为图片文件
 * @param {string} filename - 文件名
 * @returns {boolean} 是否为图片
 */
const isImage = (filename) => {
  return getFileType(filename) === 'image'
}

/**
 * 判断是否为视频文件
 * @param {string} filename - 文件名
 * @returns {boolean} 是否为视频
 */
const isVideo = (filename) => {
  return getFileType(filename) === 'video'
}

/**
 * 判断是否为音频文件
 * @param {string} filename - 文件名
 * @returns {boolean} 是否为音频
 */
const isAudio = (filename) => {
  return getFileType(filename) === 'audio'
}

/**
 * 验证文件大小
 * @param {File} file - 文件对象
 * @param {number} maxSize - 最大大小（MB）
 * @returns {boolean} 是否符合要求
 */
const validateFileSize = (file, maxSize) => {
  return file.size <= maxSize * 1024 * 1024
}

/**
 * 验证文件类型
 * @param {File} file - 文件对象
 * @param {Array} allowedTypes - 允许的扩展名数组
 * @returns {boolean} 是否符合要求
 */
const validateFileType = (file, allowedTypes) => {
  const ext = getFileExtension(file.name)
  return allowedTypes.includes(ext)
}

/**
 * 读取文件内容
 * @param {File} file - 文件对象
 * @param {string} readAs - 读取方式（text/dataURL/arrayBuffer/binaryString）
 * @returns {Promise} 文件内容
 */
const readFile = (file, readAs = 'text') => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = (e) => reject(e)

    switch (readAs) {
      case 'text':
        reader.readAsText(file)
        break
      case 'dataURL':
        reader.readAsDataURL(file)
        break
      case 'arrayBuffer':
        reader.readAsArrayBuffer(file)
        break
      case 'binaryString':
        reader.readAsBinaryString(file)
        break
      default:
        reader.readAsText(file)
    }
  })
}

/**
 * 文件转 Base64
 * @param {File} file - 文件对象
 * @returns {Promise<string>} Base64 字符串
 */
const fileToBase64 = (file) => {
  return readFile(file, 'dataURL')
}

/**
 * Base64 转文件
 * @param {string} base64 - Base64 字符串
 * @param {string} filename - 文件名
 * @returns {File} 文件对象
 */
const base64ToFile = (base64, filename) => {
  const arr = base64.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

/**
 * 压缩图片
 * @param {File} file - 图片文件
 * @param {Object} options - 配置选项
 * @param {number} options.quality - 质量（0-1），默认 0.8
 * @param {number} options.maxWidth - 最大宽度，默认不限制
 * @param {number} options.maxHeight - 最大高度，默认不限制
 * @returns {Promise<Blob>} 压缩后的图片 Blob
 */
const compressImage = (file, options = {}) => {
  const { quality = 0.8, maxWidth, maxHeight } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        let { width, height } = img

        // 计算新尺寸
        if (maxWidth && width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        if (maxHeight && height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        canvas.toBlob((blob) => resolve(blob), file.type, quality)
      }

      img.onerror = reject
      img.src = e.target.result
    }

    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * 下载 Blob
 * @param {Blob} blob - Blob 对象
 * @param {string} filename - 文件名
 */
const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * 文件处理工具类
 */
export const fileUtils = {
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
}

export default fileUtils

