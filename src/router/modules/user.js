/**
 * 用户管理模块路由
 */
export default {
  path: '/user',
  name: 'User',
  redirect: '/user/list',
  meta: {
    title: '用户管理',
    icon: 'mdi:account-group',
    order: 2,
    hidden: false
  },
  children: [
    {
      path: 'list',
      name: 'UserList',
      component: () => import('@/views/user/index.vue'),
      meta: {
        title: '用户列表',
        icon: 'mdi:account-multiple',
        hidden: false
      }
    },
    {
      path: 'role',
      name: 'UserRole',
      component: () => import('@/views/_core/error/404.vue'),
      meta: {
        title: '角色管理',
        icon: 'mdi:account-key',
        hidden: false
      }
    }
  ]
}

