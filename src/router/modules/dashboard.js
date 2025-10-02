/**
 * 仪表盘模块路由
 */
export default {
  path: '/dashboard',
  name: 'Dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    title: '仪表盘',
    icon: 'mdi:view-dashboard',
    order: 1,
    hidden: false, // 是否在菜单中隐藏
    affix: true // 是否固定在标签页
  }
}

