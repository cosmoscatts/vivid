import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { checkRoutePermission, getToRouteAfterLogin } from '~/utils'
import { NO_PERMISSION, NOT_FOUND } from '../constants'

export default function createPermissionGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const authStore = useAuthStore()
  const [hasLogin, needLogin, hasPermission] = [
    authStore.hasLogin,
    Boolean(to.meta?.requiresAuth) && !to.meta?.isWhite,
    checkRoutePermission(to),
  ]

  const actions: [boolean, () => void][] = [
    // 已登录状态跳转登录页，跳转至第一项菜单
    [hasLogin && to.name === 'Login', () => {
      const path = getToRouteAfterLogin()
      if (path) {
        next(path)
      } else {
        Message.error('请联系管理员配置菜单')
        next(NOT_FOUND)
      }
    }],
    // 不需要登录权限的页面直接通行
    [!needLogin, next],
    // 未登录状态进入需要登录权限的页面
    [!hasLogin && needLogin, () => {
      next('/login')
      if (to.path !== '/') {
        Message.error('请登录')
      }
    }],
    // 登录状态进入需要登录权限的页面，有权限直接通行
    [hasLogin && needLogin && hasPermission, next],
    // 登录状态进入需要登录权限的页面，无权限，重定向到无权限页面
    [hasLogin && needLogin && !hasPermission, () => {
      next(NO_PERMISSION)
      Message.error('没有权限哦，请联系管理员')
    }],
  ]
  strategy.some(actions)
}
