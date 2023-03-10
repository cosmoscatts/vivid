import DEFAULT_AVATAR from '~/images/default-avatar.png'

export {
  DEFAULT_AVATAR,
}

export * from './menus'
export * from './names'

export const APP_NAME = 'VIVID'

export const LOGO = ''
export const SHORT_LOGO = ''

export const TABS_STORAGE_KEY = `${APP_NAME}_TABS`
export const SETTINGS_STORAGE_KEY = `${APP_NAME}_SETTINGS`
export const THEME_MODE_KEY = `${APP_NAME}_THEME_MODE`

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
