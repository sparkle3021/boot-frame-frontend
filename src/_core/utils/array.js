/**
 * 数组去重
 * @param {Array} arr - 数组
 * @param {string|Function} key - 去重依据的键名或函数
 * @returns {Array} 去重后的数组
 */
const unique = (arr, key) => {
  if (!key) {
    return [...new Set(arr)]
  }

  const seen = new Set()
  return arr.filter((item) => {
    const keyValue = typeof key === 'function' ? key(item) : item[key]
    if (seen.has(keyValue)) {
      return false
    }
    seen.add(keyValue)
    return true
  })
}

/**
 * 数组扁平化
 * @param {Array} arr - 数组
 * @param {number} depth - 扁平化深度，默认 Infinity
 * @returns {Array} 扁平化后的数组
 */
const flatten = (arr, depth = Infinity) => {
  return arr.flat(depth)
}

/**
 * 数组分块
 * @param {Array} arr - 数组
 * @param {number} size - 每块大小
 * @returns {Array} 分块后的二维数组
 */
const chunk = (arr, size) => {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

/**
 * 数组乱序
 * @param {Array} arr - 数组
 * @returns {Array} 乱序后的数组（新数组）
 */
const shuffle = (arr) => {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * 随机取样
 * @param {Array} arr - 数组
 * @param {number} count - 取样数量，默认 1
 * @returns {Array|*} 取样结果，count=1 时返回单个元素，否则返回数组
 */
const sample = (arr, count = 1) => {
  if (count === 1) {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  const shuffled = shuffle(arr)
  return shuffled.slice(0, count)
}

/**
 * 数组分组
 * @param {Array} arr - 数组
 * @param {string|Function} key - 分组依据的键名或函数
 * @returns {Object} 分组后的对象
 */
const groupBy = (arr, key) => {
  return arr.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key]
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {})
}

/**
 * 数组排序
 * @param {Array} arr - 数组
 * @param {string|Function} key - 排序依据的键名或函数
 * @param {string} order - 排序方式，'asc' 或 'desc'，默认 'asc'
 * @returns {Array} 排序后的数组（新数组）
 */
const sortBy = (arr, key, order = 'asc') => {
  const result = [...arr]
  const getValue = typeof key === 'function' ? key : (item) => item[key]

  return result.sort((a, b) => {
    const aVal = getValue(a)
    const bVal = getValue(b)

    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * 数组差集
 * @param {Array} arr1 - 数组1
 * @param {Array} arr2 - 数组2
 * @returns {Array} arr1 中有但 arr2 中没有的元素
 */
const difference = (arr1, arr2) => {
  return arr1.filter((item) => !arr2.includes(item))
}

/**
 * 数组交集
 * @param {Array} arr1 - 数组1
 * @param {Array} arr2 - 数组2
 * @returns {Array} 两个数组的交集
 */
const intersection = (arr1, arr2) => {
  return arr1.filter((item) => arr2.includes(item))
}

/**
 * 数组并集
 * @param {Array} arr1 - 数组1
 * @param {Array} arr2 - 数组2
 * @returns {Array} 两个数组的并集（去重）
 */
const union = (arr1, arr2) => {
  return unique([...arr1, ...arr2])
}

/**
 * 数组分区
 * @param {Array} arr - 数组
 * @param {Function} predicate - 判断函数
 * @returns {Array} 二维数组，[满足条件的元素, 不满足条件的元素]
 */
const partition = (arr, predicate) => {
  const pass = []
  const fail = []

  arr.forEach((item) => {
    if (predicate(item)) {
      pass.push(item)
    } else {
      fail.push(item)
    }
  })

  return [pass, fail]
}

/**
 * 移除假值
 * @param {Array} arr - 数组
 * @returns {Array} 移除假值后的数组
 */
const compact = (arr) => {
  return arr.filter(Boolean)
}

/**
 * 列表转树形结构
 * @param {Array} list - 扁平列表
 * @param {Object} options - 配置项
 * @param {string} options.idKey - id 字段名，默认 'id'
 * @param {string} options.parentKey - 父 id 字段名，默认 'parentId'
 * @param {string} options.childrenKey - 子节点字段名，默认 'children'
 * @param {*} options.rootValue - 根节点的 parentId 值，默认 null
 * @returns {Array} 树形结构
 */
const toTree = (
  list,
  { idKey = 'id', parentKey = 'parentId', childrenKey = 'children', rootValue = null } = {},
) => {
  const map = new Map()
  const tree = []

  // 先建立映射
  list.forEach((item) => {
    map.set(item[idKey], { ...item, [childrenKey]: [] })
  })

  // 构建树形结构
  map.forEach((item) => {
    const parent = map.get(item[parentKey])
    if (parent) {
      parent[childrenKey].push(item)
    } else if (item[parentKey] === rootValue) {
      tree.push(item)
    }
  })

  return tree
}

/**
 * 在树中查找节点
 * @param {Array} tree - 树形数据
 * @param {Function} predicate - 判断函数
 * @param {string} childrenKey - 子节点字段名，默认 'children'
 * @returns {Object|null} 找到的节点
 */
const findTree = (tree, predicate, childrenKey = 'children') => {
  for (const node of tree) {
    if (predicate(node)) {
      return node
    }

    if (node[childrenKey] && node[childrenKey].length > 0) {
      const found = findTree(node[childrenKey], predicate, childrenKey)
      if (found) {
        return found
      }
    }
  }

  return null
}

/**
 * 树形结构扁平化
 * @param {Array} tree - 树形数据
 * @param {string} childrenKey - 子节点字段名，默认 'children'
 * @returns {Array} 扁平化后的数组
 */
const flattenTree = (tree, childrenKey = 'children') => {
  const result = []

  const flatten = (nodes) => {
    nodes.forEach((node) => {
      const { [childrenKey]: children, ...rest } = node
      result.push(rest)

      if (children && children.length > 0) {
        flatten(children)
      }
    })
  }

  flatten(tree)
  return result
}

/**
 * 数组处理工具类
 */
export const arrayUtils = {
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
}

export default arrayUtils

