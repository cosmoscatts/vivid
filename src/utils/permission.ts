import type { RouteLocationNormalized } from 'vue-router'

/**
 * 找到所有权限的路由路径
 */
export function getRoutesInPermission(): string[] {
  return getFlattenMenuTree()
    .map(item => item.path)
    .filter(notNullish)
}

/**
 * 判断用户是否有目标页面的权限
 */
export function checkRoutePermission(route: RouteLocationNormalized): boolean {
  const authStore = useAuthStore()
  if (!authStore.hasLogin || !authStore.menus.length || !route.path) return false
  if (route.meta.isWhite) return true

  const ownPaths = getRoutesInPermission()
  return ownPaths.includes(route.path)
}
