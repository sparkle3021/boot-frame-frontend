/**
 * 深拷贝
 * @param {*} obj - 要拷贝的对象
 * @returns {*} 拷贝后的对象
 */
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj

  // 处理日期对象
  if (obj instanceof Date) return new Date(obj)

  // 处理正则对象
  if (obj instanceof RegExp) return new RegExp(obj)

  // 处理数组
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item))
  }

  // 处理普通对象
  const cloned = {}
  Object.keys(obj).forEach((key) => {
    cloned[key] = deepClone(obj[key])
  })

  return cloned
}

/**
 * 深度合并对象
 * @param {Object} target - 目标对象
 * @param {...Object} sources - 源对象
 * @returns {Object} 合并后的对象
 */
const deepMerge = (target, ...sources) => {
  if (!sources.length) return target

  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!target[key]) {
          target[key] = {}
        }
        deepMerge(target[key], source[key])
      } else {
        target[key] = source[key]
      }
    })
  }

  return deepMerge(target, ...sources)
}

/**
 * 判断是否为对象
 * @param {*} obj - 要判断的值
 * @returns {boolean} 是否为对象
 */
const isObject = (obj) => {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

/**
 * 选取对象属性
 * @param {Object} obj - 源对象
 * @param {Array|string} keys - 要选取的键名（数组或逗号分隔的字符串）
 * @returns {Object} 包含选取属性的新对象
 */
const pick = (obj, keys) => {
  const keyArray = Array.isArray(keys) ? keys : keys.split(',').map((k) => k.trim())

  return keyArray.reduce((result, key) => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key]
    }
    return result
  }, {})
}

/**
 * 排除对象属性
 * @param {Object} obj - 源对象
 * @param {Array|string} keys - 要排除的键名（数组或逗号分隔的字符串）
 * @returns {Object} 排除指定属性后的新对象
 */
const omit = (obj, keys) => {
  const keyArray = Array.isArray(keys) ? keys : keys.split(',').map((k) => k.trim())

  return Object.keys(obj).reduce((result, key) => {
    if (!keyArray.includes(key)) {
      result[key] = obj[key]
    }
    return result
  }, {})
}

/**
 * 安全获取嵌套属性
 * @param {Object} obj - 对象
 * @param {string} path - 属性路径，如 'a.b.c'
 * @param {*} defaultValue - 默认值
 * @returns {*} 属性值
 */
const get = (obj, path, defaultValue = undefined) => {
  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    if (result === null || result === undefined) {
      return defaultValue
    }
    result = result[key]
  }

  return result === undefined ? defaultValue : result
}

/**
 * 设置嵌套属性
 * @param {Object} obj - 对象
 * @param {string} path - 属性路径，如 'a.b.c'
 * @param {*} value - 要设置的值
 * @returns {Object} 修改后的对象
 */
const set = (obj, path, value) => {
  const keys = path.split('.')
  const lastKey = keys.pop()
  let current = obj

  for (const key of keys) {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }

  current[lastKey] = value
  return obj
}

/**
 * 检查对象是否有指定属性（支持路径）
 * @param {Object} obj - 对象
 * @param {string} path - 属性路径，如 'a.b.c'
 * @returns {boolean} 是否存在
 */
const has = (obj, path) => {
  const keys = path.split('.')
  let current = obj

  for (const key of keys) {
    if (current === null || current === undefined || !current.hasOwnProperty(key)) {
      return false
    }
    current = current[key]
  }

  return true
}

/**
 * 扁平化对象
 * @param {Object} obj - 对象
 * @param {string} separator - 分隔符，默认 '.'
 * @returns {Object} 扁平化后的对象
 */
const flattenObject = (obj, separator = '.') => {
  const result = {}

  const flatten = (current, prefix = '') => {
    Object.keys(current).forEach((key) => {
      const newKey = prefix ? `${prefix}${separator}${key}` : key

      if (isObject(current[key])) {
        flatten(current[key], newKey)
      } else {
        result[newKey] = current[key]
      }
    })
  }

  flatten(obj)
  return result
}

/**
 * 反扁平化对象
 * @param {Object} obj - 扁平对象
 * @param {string} separator - 分隔符，默认 '.'
 * @returns {Object} 嵌套对象
 */
const unflattenObject = (obj, separator = '.') => {
  const result = {}

  Object.keys(obj).forEach((key) => {
    set(result, key.split(separator).join('.'), obj[key])
  })

  return result
}

/**
 * 对象差异比较
 * @param {Object} obj1 - 对象1
 * @param {Object} obj2 - 对象2
 * @returns {Object} 差异对象，包含 added、deleted、updated
 */
const diffObject = (obj1, obj2) => {
  const result = {
    added: {},
    deleted: {},
    updated: {},
  }

  // 检查新增和更新
  Object.keys(obj2).forEach((key) => {
    if (!obj1.hasOwnProperty(key)) {
      result.added[key] = obj2[key]
    } else if (obj1[key] !== obj2[key]) {
      result.updated[key] = {
        old: obj1[key],
        new: obj2[key],
      }
    }
  })

  // 检查删除
  Object.keys(obj1).forEach((key) => {
    if (!obj2.hasOwnProperty(key)) {
      result.deleted[key] = obj1[key]
    }
  })

  return result
}

/**
 * 冻结对象（深度冻结）
 * @param {Object} obj - 对象
 * @returns {Object} 冻结后的对象
 */
const deepFreeze = (obj) => {
  Object.freeze(obj)

  Object.keys(obj).forEach((key) => {
    if (isObject(obj[key]) || Array.isArray(obj[key])) {
      deepFreeze(obj[key])
    }
  })

  return obj
}

/**
 * 对象处理工具类
 */
export const objectUtils = {
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
}

export default objectUtils

