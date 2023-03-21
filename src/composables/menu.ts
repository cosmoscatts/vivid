import type { Menu } from '~/types'
import { MENU_ICON_MAP } from '~/constants'

/**
 * 获取扁平化的菜单
 *
 * @dfs 深度递归
 */
export function getFlattenMenuTree(): Menu[] {
  const authStore = useAuthStore()
  if (!authStore.menus.length) return []
  const fn: (item: Menu) => Menu[] = (item: Menu) => {
    if (!item.children?.length) return [item]
    return [
      item,
      ...item.children.flatMap((i: Menu) => fn(i), Infinity),
    ]
  }
  return authStore.menus.flatMap(fn, Infinity)
}

/**
 * 菜单是否有图标
 */
export function hasMenuIcon(icon?: string) {
  if (!icon) return false
  return Object.keys(MENU_ICON_MAP).includes(icon)
}

/**
 * 转换菜单图标
 */
export function formatMenuIcon(icon: string) {
  return MENU_ICON_MAP[icon]
}

/**
 * 根据路由 path 找菜单项（包括其父级，如果存在）
 *
 * @special '/profile' 需要特判
 */
export function getMatchedMenuItemsIfParentExist(path: string) {
  if (path === '/profile') return [{ title: '个人资料', icon: 'profile' }]
  const authStore = useAuthStore()
  const menus = authStore.menus
  if (!menus.length) return []
  for (const item of menus) {
    if (!item.children?.length && item.path === path) return [item]
    if (item.children?.length) {
      for (const child of item.children) {
        if (child.path === path) return [item, child]
      }
    }
  }
  return []
}
