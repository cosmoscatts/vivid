import { defaultThemeColors, THEME_MODE_KEY } from '~/constants'

export function createPrimaryColor(colorProp: string) {
  if (!defaultThemeColors.map(i => i.prop).includes(colorProp)) return
  Array.from({ length: 10 }).forEach((_, index) => {
    document.body.style.setProperty(`--primary-${index + 1}`, `var(--${colorProp}-${index + 1})`)
  })
}

export function createThemeMode(mode: 'auto' | 'light' | 'dark') {
  if (!localStorage.getItem(THEME_MODE_KEY) || localStorage.getItem(THEME_MODE_KEY) !== mode) {
    if (mode === 'auto') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      localStorage.setItem(THEME_MODE_KEY, prefersDark
        ? 'dark'
        : 'light')
    } else {
      localStorage.setItem(THEME_MODE_KEY, mode)
    }
  }
  return useDark({
    storageKey: THEME_MODE_KEY,
    valueDark: 'dark',
    valueLight: 'light',
  })
}
