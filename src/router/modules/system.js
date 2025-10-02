/**
 * 系统管理模块路由
 */
export default {
  path: '/system',
  name: 'System',
  redirect: '/system/menu',
  meta: {
    title: '系统管理',
    icon: 'mdi:cog',
    order: 3,
    hidden: false
  },
  children: [
    {
      path: 'menu',
      name: 'SystemMenu',
      component: () => import('@/views/_core/error/404.vue'),
      meta: {
        title: '菜单管理',
        icon: 'mdi:menu',
        hidden: false
      }
    },
    {
      path: 'dict',
      name: 'SystemDict',
      component: () => import('@/views/_core/error/404.vue'),
      meta: {
        title: '字典管理',
        icon: 'mdi:book-open-variant',
        hidden: false
      }
    },
    {
      path: 'config',
      name: 'SystemConfig',
      component: () => import('@/views/system/index.vue'),
      meta: {
        title: '参数设置',
        icon: 'mdi:cog-outline',
        hidden: false
      }
    }
  ]
}

