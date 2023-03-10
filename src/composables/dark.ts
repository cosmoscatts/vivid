import { DEFAULT_DARK_MODE } from '~/constants'
import { createThemeMode } from '~/utils'

export const isDark = createThemeMode(DEFAULT_DARK_MODE)
export const toggleDark = useToggle(isDark)
export const createArcoTheme = () => {
  if (isDark.value) document.body.setAttribute('arco-theme', 'dark')
  else document.body.removeAttribute('arco-theme')
}
watch(isDark, createArcoTheme, { immediate: true })
