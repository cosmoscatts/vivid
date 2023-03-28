import { type Settings, defaultSettings } from '~/config'
import { CACHE_SETTINGS } from '~/constants'
import { applyCachedSettings, cacheSettings, cacheTabs, clearCachedTabs, createPrimaryColor } from '~/utils'

export const useUiStore = defineStore('uiStore', () => {
  const data = CACHE_SETTINGS
    ? applyCachedSettings(defaultSettings)
    : defaultSettings
  const settings = reactive<Settings>(clone(data))
  const settingsCopy = reactive<Settings>(clone(data))

  createPrimaryColor(settings.primaryColor)

  const collapse = useBool(false)
  const reloadFlag = ref(true)

  return {
    reloadFlag,
    settings,
    settingsCopy,
    collapseSide: {
      state: computed(() => {
        if (settings.layout === 'horizontal' || isMobile.value) return false
        return collapse.bool.value
      }),
      collapse: collapse.setTrue,
      unCollapse: collapse.setFalse,
      toggle: collapse.toggle,
    },
    applyCopySettings() { // 保存暂存的副本设置
      // 如果主题主要色调发生改变，替换主色调
      if (settings.primaryColor !== settingsCopy.primaryColor) {
        createPrimaryColor(settingsCopy.primaryColor)
      }

      assignObj(settingsCopy, settings)

      // 如果改变 [showTabs | cacheTabs]
      // 需要更新多页签的缓存
      if (settings.showTabs && settings.cacheTabs) {
        cacheTabs([...useTabStore().tabs])
      } else {
        clearCachedTabs()
      }

      if (CACHE_SETTINGS) cacheSettings({ ...settings })
    },
    resetCopySettings() { // 重置副本
      assignObj(settings, settingsCopy)
    },
    /**
     * 重载页面
     * @param duration - 重载的延迟时间(ms)
     */
    async reloadPage(duration = 0) {
      reloadFlag.value = false
      await nextTick()
      if (duration) {
        useTimeoutFn(() => {
          reloadFlag.value = true
        }, duration)
      } else {
        reloadFlag.value = true
      }
    },
  }
}, { persist: { enabled: true } })

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUiStore, import.meta.hot))
}
