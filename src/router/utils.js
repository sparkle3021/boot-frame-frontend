/**
 * 路由工具函数
 */

/**
 * 自动导入所有模块路由
 * @returns {Array} 路由配置数组
 */
export function loadModuleRoutes() {
  const modules = import.meta.glob('./modules/*.js', { eager: true })
  const routes = []
  
  for (const path in modules) {
    const module = modules[path]
    if (module.default) {
      routes.push(module.default)
    }
  }
  
  // 按 order 排序
  return routes.sort((a, b) => {
    const orderA = a.meta?.order ?? 999
    const orderB = b.meta?.order ?? 999
    return orderA - orderB
  })
}

/**
 * 从路由生成菜单数据
 * @param {Array} routes - 路由配置
 * @param {String} parentPath - 父级路径
 * @returns {Array} 菜单数据
 */
export function generateMenuFromRoutes(routes, parentPath = '') {
  const menus = []
  
  routes.forEach(route => {
    // 跳过隐藏的路由
    if (route.meta?.hidden) {
      return
    }
    
    const fullPath = getFullPath(parentPath, route.path)
    
    const menuItem = {
      path: fullPath,
      name: route.name,
      title: route.meta?.title || route.name,
      icon: route.meta?.icon,
      order: route.meta?.order ?? 999,
      affix: route.meta?.affix ?? false
    }
    
    // 处理子路由
    if (route.children && route.children.length > 0) {
      const children = generateMenuFromRoutes(route.children, fullPath)
      if (children.length > 0) {
        menuItem.children = children
      }
    }
    
    menus.push(menuItem)
  })
  
  return menus
}

/**
 * 获取完整路径
 * @param {String} parentPath - 父级路径
 * @param {String} path - 当前路径
 * @returns {String} 完整路径
 */
function getFullPath(parentPath, path) {
  if (path.startsWith('/')) {
    return path
  }
  
  if (!parentPath) {
    return `/${path}`
  }
  
  return `${parentPath}/${path}`.replace(/\/+/g, '/')
}

/**
 * 扁平化路由（用于注册到 router）
 * @param {Array} routes - 路由配置
 * @returns {Array} 扁平化的路由配置
 */
export function flattenRoutes(routes) {
  const result = []
  
  routes.forEach(route => {
    result.push(route)
    
    if (route.children && route.children.length > 0) {
      result.push(...flattenRoutes(route.children))
    }
  })
  
  return result
}

/**
 * 过滤路由（根据权限等条件）
 * @param {Array} routes - 路由配置
 * @param {Function} filterFn - 过滤函数
 * @returns {Array} 过滤后的路由配置
 */
export function filterRoutes(routes, filterFn) {
  return routes.filter(route => {
    const shouldInclude = filterFn(route)
    
    if (shouldInclude && route.children) {
      route.children = filterRoutes(route.children, filterFn)
    }
    
    return shouldInclude
  })
}

/**
 * 查找路由
 * @param {Array} routes - 路由配置
 * @param {String} name - 路由名称
 * @returns {Object|null} 找到的路由对象
 */
export function findRoute(routes, name) {
  for (const route of routes) {
    if (route.name === name) {
      return route
    }
    
    if (route.children) {
      const found = findRoute(route.children, name)
      if (found) {
        return found
      }
    }
  }
  
  return null
}

/**
 * 获取面包屑导航
 * @param {Array} routes - 路由配置
 * @param {String} currentPath - 当前路径
 * @returns {Array} 面包屑数组
 */
export function getBreadcrumbs(routes, currentPath) {
  const breadcrumbs = []
  
  function findPath(routes, path, parents = []) {
    for (const route of routes) {
      const fullPath = getFullPath(parents.length > 0 ? parents[parents.length - 1].path : '', route.path)
      
      if (fullPath === path) {
        return [...parents, route]
      }
      
      if (route.children) {
        const result = findPath(route.children, path, [...parents, route])
        if (result) {
          return result
        }
      }
    }
    
    return null
  }
  
  const path = findPath(routes, currentPath)
  if (path) {
    return path.map(route => ({
      title: route.meta?.title || route.name,
      path: getFullPath('', route.path)
    }))
  }
  
  return breadcrumbs
}

