import type { Menu } from '~/types'

/**
 * 获取扁平化的菜单
 */
export function getFlattenMenuTree(): Menu[] {
  const authStore = useAuthStore()
  const fn: (item: Menu) => Menu[] = (item: Menu) => {
    if (!item.children?.length) return [item]
    return [
      item,
      ...item.children.flatMap((i: Menu) => fn(i), Infinity),
    ]
  }
  return authStore.menus.flatMap(fn, Infinity)
}
