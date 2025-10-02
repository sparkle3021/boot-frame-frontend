/**
 * 系统监控模块路由
 */
export default {
  path: '/monitor',
  name: 'Monitor',
  redirect: '/monitor/online',
  meta: {
    title: '系统监控',
    icon: 'mdi:monitor',
    order: 4,
    hidden: false
  },
  children: [
    {
      path: 'online',
      name: 'MonitorOnline',
      component: () => import('@/views/_core/error/404.vue'),
      meta: {
        title: '在线用户',
        icon: 'mdi:account-circle',
        hidden: false
      }
    },
    {
      path: 'job',
      name: 'MonitorJob',
      component: () => import('@/views/_core/error/404.vue'),
      meta: {
        title: '定时任务',
        icon: 'mdi:clock-outline',
        hidden: false
      }
    },
    {
      path: 'server',
      name: 'MonitorServer',
      component: () => import('@/views/_core/error/404.vue'),
      meta: {
        title: '服务监控',
        icon: 'mdi:server',
        hidden: false
      }
    }
  ]
}

