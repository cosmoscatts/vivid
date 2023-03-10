import LOGO from '~/images/logo.png'
import SHORT_LOGO from '~/images/short-logo.png'
import DEFAULT_AVATAR from '~/images/default-avatar.png'

export {
  LOGO,
  SHORT_LOGO,
  DEFAULT_AVATAR,
}

export * from './menus'
export * from './names'
export * from './layout'
export * from './menu-icons'

export const APP_META = {
  author: 'Cosmoscatts',
  name: 'VIVID',
  description: 'Vue3 管理系统（Arco Design）',
  github: 'https://github.com/cosmoscatts/vivid',
  copyRight: 'VIVID - Made by Cosmoscatts',
}

export const TABS_STORAGE_KEY = `${APP_META.name}_TABS`
export const SETTINGS_STORAGE_KEY = `${APP_META.name}_SETTINGS`
export const THEME_MODE_KEY = `${APP_META.name}_THEME_MODE`

export const AXIOS_TIMEOUT = 5000

/**
 * 数据来源
 */
export const IS_MOCK = true
/**
 * 是否显示【页面设置】按钮
 */
export const SHOW_SETTINGS_BUTTON = true
/**
 * 是否缓存【页面设置】
 */
export const CACHE_SETTINGS = true
/**
 * 页面默认亮暗模式
 */
export const DEFAULT_DARK_MODE: 'dark' | 'light' | 'auto' = 'auto'
