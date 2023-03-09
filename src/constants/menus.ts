import type { Menu } from '~/types'

/**
 * 从前端获取的菜单数据
 *
 * 如果接入后端，应使用后端传递的菜单数据
 */
export const MENUS: Menu[] = [
  {
    id: 101,
    title: '首页',
    icon: 'home',
    path: '/dashboard',
  },
  {
    id: 102,
    title: '系统管理',
    icon: 'system',
    children: [
      {
        id: 10201,
        title: '用户管理',
        icon: 'user',
        path: '/system/user',
      },
      {
        id: 10202,
        title: '角色管理',
        icon: 'role',
        path: '/system/role',
      },
    ],
  },
]
