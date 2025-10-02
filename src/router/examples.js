/**
 * 动态路由系统使用示例
 * 本文件展示了如何使用动态路由系统的各种功能
 */

import router from '@/router'
import { useRouterStore } from '@/stores/router'

// ============ 示例 1: 获取菜单数据 ============
export function example1_GetMenus() {
  const routerStore = useRouterStore()
  
  // 获取完整的菜单树
  const menus = routerStore.menus
  console.log('菜单树:', menus)
  
  // 获取扁平化的菜单列表（用于搜索等场景）
  const flatMenus = routerStore.flatMenus
  console.log('扁平化菜单:', flatMenus)
}

// ============ 示例 2: 根据权限过滤路由 ============
export function example2_FilterByPermission() {
  const routerStore = useRouterStore()
  
  // 假设用户拥有以下权限
  const userPermissions = [
    'dashboard:view',
    'user:view',
    'user:edit',
    'system:config'
  ]
  
  // 根据权限过滤路由
  routerStore.filterRoutesByPermission(userPermissions)
  
  console.log('过滤后的路由:', routerStore.routes)
  console.log('过滤后的菜单:', routerStore.menus)
}

// ============ 示例 3: 根据角色过滤路由 ============
export function example3_FilterByRole() {
  const routerStore = useRouterStore()
  
  // 假设用户拥有以下角色
  const userRoles = ['admin', 'manager']
  
  // 根据角色过滤路由
  routerStore.filterRoutesByRole(userRoles)
  
  console.log('过滤后的路由:', routerStore.routes)
  console.log('过滤后的菜单:', routerStore.menus)
}

// ============ 示例 4: 动态添加路由 ============
export function example4_AddDynamicRoutes() {
  const routerStore = useRouterStore()
  
  // 定义要动态添加的路由
  const dynamicRoutes = [
    {
      path: '/dynamic',
      name: 'Dynamic',
      redirect: '/dynamic/page1',
      meta: {
        title: '动态模块',
        icon: 'mdi:rocket',
        order: 10
      },
      children: [
        {
          path: 'page1',
          name: 'DynamicPage1',
          component: () => import('@/views/_core/error/404.vue'),
          meta: {
            title: '动态页面1',
            icon: 'mdi:file-document'
          }
        },
        {
          path: 'page2',
          name: 'DynamicPage2',
          component: () => import('@/views/_core/error/404.vue'),
          meta: {
            title: '动态页面2',
            icon: 'mdi:file-document-outline'
          }
        }
      ]
    }
  ]
  
  // 添加到 store
  routerStore.addDynamicRoutes(dynamicRoutes)
  
  // 注册到 vue-router
  dynamicRoutes.forEach(route => {
    router.addRoute(route)
  })
  
  console.log('动态路由已添加:', routerStore.routes)
}

// ============ 示例 5: 根据后端数据生成路由 ============
export async function example5_GenerateRoutesFromBackend() {
  const routerStore = useRouterStore()
  
  // 模拟从后端获取路由数据
  const backendRoutes = await fetchRoutesFromBackend()
  
  // 转换后端数据为前端路由格式
  const routes = transformBackendRoutes(backendRoutes)
  
  // 添加路由
  routerStore.addDynamicRoutes(routes)
  
  // 注册到 vue-router
  routes.forEach(route => {
    router.addRoute(route)
  })
  
  console.log('从后端生成的路由:', routes)
}

// 模拟后端 API
function fetchRoutesFromBackend() {
  return Promise.resolve([
    {
      id: 1,
      path: '/custom',
      name: 'Custom',
      title: '自定义模块',
      icon: 'mdi:star',
      component: 'custom/index',
      children: [
        {
          id: 2,
          path: 'list',
          name: 'CustomList',
          title: '列表页',
          icon: 'mdi:format-list-bulleted',
          component: 'custom/list'
        }
      ]
    }
  ])
}

// 转换后端路由数据为前端格式
function transformBackendRoutes(backendRoutes) {
  const componentMap = {
    'custom/index': () => import('@/views/_core/error/404.vue'),
    'custom/list': () => import('@/views/_core/error/404.vue')
  }
  
  function transform(routes) {
    return routes.map(route => {
      const transformed = {
        path: route.path,
        name: route.name,
        meta: {
          title: route.title,
          icon: route.icon
        }
      }
      
      // 设置组件
      if (route.component && componentMap[route.component]) {
        transformed.component = componentMap[route.component]
      }
      
      // 如果有子路由，设置 redirect
      if (route.children && route.children.length > 0) {
        transformed.redirect = `${route.path}/${route.children[0].path}`
        transformed.children = transform(route.children)
      }
      
      return transformed
    })
  }
  
  return transform(backendRoutes)
}

// ============ 示例 6: 查找菜单项 ============
export function example6_FindMenu() {
  const routerStore = useRouterStore()
  
  // 根据路径查找
  const menu1 = routerStore.findMenuByPath('/user/list')
  console.log('根据路径查找:', menu1)
  
  // 根据名称查找
  const menu2 = routerStore.findMenuByName('UserList')
  console.log('根据名称查找:', menu2)
}

// ============ 示例 7: 获取固定标签页 ============
export function example7_GetAffixTabs() {
  const routerStore = useRouterStore()
  
  // 获取所有固定的标签页（meta.affix = true）
  const affixTabs = routerStore.getAffixTabs()
  console.log('固定标签页:', affixTabs)
}

// ============ 示例 8: 重置路由 ============
export function example8_ResetRoutes() {
  const routerStore = useRouterStore()
  
  // 重置路由（清除所有动态添加的路由）
  routerStore.resetRoutes()
  
  console.log('路由已重置')
}

// ============ 示例 9: 在 Vue 组件中使用 ============
/**
 * 在 Vue 组件中使用示例
 * 
 * <script setup>
 * import { useRouterStore } from '@/stores/router'
 * import { computed } from 'vue'
 * 
 * const routerStore = useRouterStore()
 * 
 * // 获取菜单数据
 * const menus = computed(() => routerStore.menus)
 * 
 * // 过滤路由
 * const filterRoutes = () => {
 *   const permissions = ['user:view', 'system:edit']
 *   routerStore.filterRoutesByPermission(permissions)
 * }
 * 
 * // 添加动态路由
 * const addRoute = () => {
 *   const newRoute = {
 *     path: '/new',
 *     name: 'New',
 *     component: () => import('@/views/new/index.vue'),
 *     meta: { title: '新模块', icon: 'mdi:new-box' }
 *   }
 *   routerStore.addDynamicRoutes([newRoute])
 * }
 * </script>
 * 
 * <template>
 *   <div>
 *     <div v-for="menu in menus" :key="menu.path">
 *       {{ menu.title }}
 *     </div>
 *   </div>
 * </template>
 */

// ============ 示例 10: 路由守卫中使用 ============
/**
 * 在路由守卫中使用示例
 * 
 * // 在 router/index.js 中
 * import { useRouterStore } from '@/stores/router'
 * 
 * router.beforeEach(async (to, from, next) => {
 *   const routerStore = useRouterStore()
 *   
 *   // 检查用户是否已登录
 *   const isLoggedIn = checkUserLogin()
 *   
 *   if (isLoggedIn) {
 *     // 如果还没有生成路由，则生成
 *     if (routerStore.routes.length === 0) {
 *       // 获取用户权限
 *       const permissions = await getUserPermissions()
 *       
 *       // 根据权限过滤路由
 *       routerStore.filterRoutesByPermission(permissions)
 *       
 *       // 替换当前路由，确保动态路由生效
 *       next({ ...to, replace: true })
 *     } else {
 *       next()
 *     }
 *   } else {
 *     // 未登录，跳转到登录页
 *     next('/login')
 *   }
 * })
 */

// ============ 完整的应用初始化流程示例 ============
export async function exampleComplete_InitializeApp() {
  const routerStore = useRouterStore()
  
  try {
    // 1. 获取用户信息
    const userInfo = await fetchUserInfo()
    console.log('用户信息:', userInfo)
    
    // 2. 根据用户权限过滤路由
    if (userInfo.permissions) {
      routerStore.filterRoutesByPermission(userInfo.permissions)
    }
    
    // 3. 根据用户角色过滤路由
    if (userInfo.roles) {
      routerStore.filterRoutesByRole(userInfo.roles)
    }
    
    // 4. 获取后端配置的动态路由（可选）
    const dynamicRoutes = await fetchRoutesFromBackend()
    if (dynamicRoutes && dynamicRoutes.length > 0) {
      const routes = transformBackendRoutes(dynamicRoutes)
      routerStore.addDynamicRoutes(routes)
      
      // 注册到 vue-router
      routes.forEach(route => {
        router.addRoute(route)
      })
    }
    
    // 5. 初始化完成
    console.log('应用初始化完成')
    console.log('最终路由:', routerStore.routes)
    console.log('最终菜单:', routerStore.menus)
    
  } catch (error) {
    console.error('应用初始化失败:', error)
  }
}

// 模拟获取用户信息
function fetchUserInfo() {
  return Promise.resolve({
    id: 1,
    username: 'admin',
    roles: ['admin'],
    permissions: [
      'dashboard:view',
      'user:view',
      'user:edit',
      'system:view',
      'system:edit'
    ]
  })
}

