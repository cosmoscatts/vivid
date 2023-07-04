import type { TreeNodeData } from '@arco-design/web-vue'
import type { Menu } from '~/types'
import { MENU_ICON_MAP } from '~/constants'

/**
 * 获取扁平化的菜单
 *
 * @dfs 深度递归
 */
export function flattenMenu(menus: Menu[]): Menu[] {
  if (!menus.length) return []
  const fn = (item: Menu): Menu[] => {
    if (!item.children?.length) return [item]
    return [
      item,
      ...item.children.flatMap((i: Menu) => fn(i), Number.POSITIVE_INFINITY),
    ]
  }
  return menus.flatMap(fn, Number.POSITIVE_INFINITY)
}

/**
 * 获取用户拥有的扁平化菜单
 */
export function getUserFlattenMenuTree(): Menu[] {
  const authStore = useAuthStore()
  return flattenMenu(authStore.menus)
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
export function getMatchedMenuItemsIfParentExist(path: string): Menu[] {
  if (path === '/profile') return [{ title: '个人资料', icon: 'profile' } as Menu]
  const authStore = useAuthStore()
  const result = [] as Menu[]
  const dfs = (menus: Menu[], index: number): boolean => {
    if (index >= menus.length) return false
    const current = menus[index]
    if (current.path === path) {
      result.unshift(current)
      return true
    }
    if (current.children?.length) {
      const f = dfs(current.children, 0)
      if (f) {
        result.unshift(current)
        return true
      }
    }
    return dfs(menus, index + 1)
  }

  dfs(authStore.menus, 0)
  return result
}

/**
 * 将菜单数据转换成组件 <a-tree> 所需要的格式
 */
export function generateTreeMenuData(menus: Menu[]): TreeNodeData[] {
  if (!menus.length) return []
  const fn = (item: Menu): TreeNodeData => {
    return {
      key: item.id,
      title: item.title,
      icon: hasMenuIcon(item.icon) ? () => h(formatMenuIcon(item.icon!)) : undefined,
      children: item.children?.map(child => fn(child)),
    } as unknown as TreeNodeData
  }
  return menus.map(item => fn(item))
}
