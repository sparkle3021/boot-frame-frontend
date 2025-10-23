/**
 * 用户管理模块路由
 */
export default {
  path: '/system',
  name: 'System',
  redirect: '/system/list',
  meta: {
    title: '系统管理',
    icon: 'mdi:cog',
    order: 2,
    hidden: false,
  },
  children: [
    {
      path: 'list',
      name: 'UserList',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: '用户列表',
        icon: 'mdi:account-multiple',
        hidden: false,
      },
    },
  ],
}
