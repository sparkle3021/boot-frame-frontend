/**
 * 仪表盘模块路由
 */
export default [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '仪表盘',
      icon: 'mdi:view-dashboard',
      order: 1,
      hidden: false, // 是否在菜单中隐藏
      affix: true, // 是否固定在标签页
    },
  },
  {
    path: '/table-example',
    name: 'TableExample',
    component: () => import('@/views/dashboard/table-example.vue'),
    meta: {
      title: 'ProTable示例',
      icon: 'mdi:table',
      order: 2,
      hidden: false,
    },
  },
]
