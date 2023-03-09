export default [
  {
    path: '/system/user',
    name: 'User',
    component: () => import('~/pages/user/index.vue'),
    meta: {
      title: '用户管理',
      requiresAuth: true,
      cached: false,
      layout: 'default',
    },
  },
  {
    path: '/system/role',
    name: 'Role',
    component: () => import('~/pages/role/index.vue'),
    meta: {
      title: '角色管理',
      requiresAuth: true,
      cached: false,
      layout: 'default',
    },
  },
]
