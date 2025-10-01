import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: '仪表盘',
        keepAlive: 'Dashboard'
      }
    },
    {
      path: '/user',
      name: 'User',
      meta: {
        title: '用户管理'
      },
      children: [
        {
          path: 'list',
          name: 'UserList',
          component: () => import('@/views/user/index.vue'),
          meta: {
            title: '用户列表',
            keepAlive: 'UserList'
          }
        },
        {
          path: 'role',
          name: 'UserRole',
          component: () => import('@/views/_core/error/404.vue'),
          meta: {
            title: '角色管理'
          }
        }
      ]
    },
    {
      path: '/system',
      name: 'System',
      meta: {
        title: '系统管理'
      },
      children: [
        {
          path: 'menu',
          name: 'SystemMenu',
          component: () => import('@/views/_core/error/404.vue'),
          meta: {
            title: '菜单管理'
          }
        },
        {
          path: 'dict',
          name: 'SystemDict',
          component: () => import('@/views/_core/error/404.vue'),
          meta: {
            title: '字典管理'
          }
        },
        {
          path: 'config',
          name: 'SystemConfig',
          component: () => import('@/views/system/index.vue'),
          meta: {
            title: '参数设置',
            keepAlive: 'SystemConfig'
          }
        }
      ]
    },
    {
      path: '/monitor',
      name: 'Monitor',
      meta: {
        title: '系统监控'
      },
      children: [
        {
          path: 'online',
          name: 'MonitorOnline',
          component: () => import('@/views/_core/error/404.vue'),
          meta: {
            title: '在线用户'
          }
        },
        {
          path: 'job',
          name: 'MonitorJob',
          component: () => import('@/views/_core/error/404.vue'),
          meta: {
            title: '定时任务'
          }
        },
        {
          path: 'server',
          name: 'MonitorServer',
          component: () => import('@/views/_core/error/404.vue'),
          meta: {
            title: '服务监控'
          }
        }
      ]
    },
    {
      path: '/analysis',
      name: 'Analysis',
      meta: {
        title: '数据分析'
      },
      children: [
        {
          path: 'report',
          name: 'AnalysisReport',
          component: () => import('@/views/_core/error/404.vue'),
          meta: {
            title: '数据报表'
          }
        },
        {
          path: 'chart',
          name: 'AnalysisChart',
          component: () => import('@/views/_core/error/404.vue'),
          meta: {
            title: '图表展示'
          }
        }
      ]
    },
    // 错误页面
    {
      path: '/403',
      name: 'Error403',
      component: () => import('@/views/_core/error/403.vue'),
      meta: {
        title: '403 - 无权限'
      }
    },
    {
      path: '/404',
      name: 'Error404',
      component: () => import('@/views/_core/error/404.vue'),
      meta: {
        title: '404 - 页面不存在'
      }
    },
    {
      path: '/500',
      name: 'Error500',
      component: () => import('@/views/_core/error/500.vue'),
      meta: {
        title: '500 - 服务器错误'
      }
    },
    // 404 兜底路由
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ],
})

export default router
