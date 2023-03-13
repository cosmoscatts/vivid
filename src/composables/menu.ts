import type { Menu } from '~/types'

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
