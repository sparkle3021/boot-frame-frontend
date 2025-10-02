import { moduleRoutes } from '@/router'
import { filterRoutes, generateMenuFromRoutes } from '@/router/utils'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

/**
 * 路由状态管理
 */
export const useRouterStore = defineStore('router', () => {
  // 原始路由配置
  const routes = ref([...moduleRoutes])
  
  // 动态添加的路由
  const dynamicRoutes = ref([])
  
  // 菜单数据（从路由自动生成）
  const menus = computed(() => {
    return generateMenuFromRoutes(routes.value)
  })
  
  // 扁平化的菜单（用于搜索等场景）
  const flatMenus = computed(() => {
    const flatten = (menus, result = []) => {
      menus.forEach(menu => {
        result.push(menu)
        if (menu.children && menu.children.length > 0) {
          flatten(menu.children, result)
        }
      })
      return result
    }
    return flatten(menus.value)
  })
  
  /**
   * 设置路由
   * @param {Array} newRoutes - 新的路由配置
   */
  const setRoutes = (newRoutes) => {
    routes.value = newRoutes
  }
  
  /**
   * 添加动态路由
   * @param {Array} newRoutes - 要添加的路由
   */
  const addDynamicRoutes = (newRoutes) => {
    dynamicRoutes.value.push(...newRoutes)
    routes.value.push(...newRoutes)
  }
  
  /**
   * 重置路由（清除动态路由）
   */
  const resetRoutes = () => {
    routes.value = [...moduleRoutes]
    dynamicRoutes.value = []
  }
  
  /**
   * 根据权限过滤路由
   * @param {Array} permissions - 用户权限列表
   */
  const filterRoutesByPermission = (permissions) => {
    const filteredRoutes = filterRoutes(routes.value, (route) => {
      // 如果路由没有定义权限要求，则显示
      if (!route.meta?.permissions) {
        return true
      }
      
      // 检查用户是否有所需权限
      return route.meta.permissions.some(permission => 
        permissions.includes(permission)
      )
    })
    
    routes.value = filteredRoutes
  }
  
  /**
   * 根据角色过滤路由
   * @param {Array} roles - 用户角色列表
   */
  const filterRoutesByRole = (roles) => {
    const filteredRoutes = filterRoutes(routes.value, (route) => {
      // 如果路由没有定义角色要求，则显示
      if (!route.meta?.roles) {
        return true
      }
      
      // 检查用户是否有所需角色
      return route.meta.roles.some(role => roles.includes(role))
    })
    
    routes.value = filteredRoutes
  }
  
  /**
   * 根据路径查找菜单
   * @param {String} path - 路由路径
   * @returns {Object|null} 找到的菜单项
   */
  const findMenuByPath = (path) => {
    return flatMenus.value.find(menu => menu.path === path)
  }
  
  /**
   * 根据名称查找菜单
   * @param {String} name - 路由名称
   * @returns {Object|null} 找到的菜单项
   */
  const findMenuByName = (name) => {
    return flatMenus.value.find(menu => menu.name === name)
  }
  
  /**
   * 获取固定标签页
   * @returns {Array} 固定的标签页列表
   */
  const getAffixTabs = () => {
    return flatMenus.value.filter(menu => menu.affix)
  }
  
  return {
    // 状态
    routes,
    dynamicRoutes,
    menus,
    flatMenus,
    
    // 方法
    setRoutes,
    addDynamicRoutes,
    resetRoutes,
    filterRoutesByPermission,
    filterRoutesByRole,
    findMenuByPath,
    findMenuByName,
    getAffixTabs
  }
})

