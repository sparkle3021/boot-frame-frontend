import { createRouter, createWebHistory } from 'vue-router'
import { loadModuleRoutes } from './utils'

// 自动加载模块路由
const moduleRoutes = loadModuleRoutes()

// 固定路由（不需要显示在菜单中的路由）
const constantRoutes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  // 错误页面
  {
    path: '/403',
    name: 'Error403',
    component: () => import('@/views/_core/error/403.vue'),
    meta: {
      title: '403 - 无权限',
      hidden: true
    }
  },
  {
    path: '/404',
    name: 'Error404',
    component: () => import('@/views/_core/error/404.vue'),
    meta: {
      title: '404 - 页面不存在',
      hidden: true
    }
  },
  {
    path: '/500',
    name: 'Error500',
    component: () => import('@/views/_core/error/500.vue'),
    meta: {
      title: '500 - 服务器错误',
      hidden: true
    }
  },
  // 404 兜底路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      hidden: true
    }
  }
]

// 合并所有路由
const routes = [...moduleRoutes, ...constantRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 导出模块路由供其他地方使用（如菜单生成）
export { moduleRoutes }

export default router
