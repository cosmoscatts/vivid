import type { RouteLocationNormalized } from 'vue-router'
import type { Menu } from '~/types'

/**
 * 找到所有权限的路由路径
 */
export function getRoutesInPermission(): string[] {
  const authStore = useAuthStore()
  if (!authStore.menus.length) return []

  const fn: (item: Menu) => Menu[] = (item: Menu) => {
    if (!item.children?.length) return [item]
    return [
      item,
      ...item.children.flatMap((i: Menu) => fn(i), Infinity),
    ]
  }

  return authStore.menus
    .flatMap(fn, Infinity)
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
