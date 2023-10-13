import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  presetWind,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'hw-full': 'h-full w-full',
    'hw-screen': 'h-screen w-screen',
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'flex-col-center': 'flex-col flex-center',
    'border-base': 'border-[rgb(var(--gray-3))]',
    'icon-btn': 'op30 hover:op100 hover:bg-primary_hover',
    'bg-body': 'bg-gray:15 dark:bg-[#17171A]',
    'bg-nav': 'bg-white dark:bg-[#232324]',
    'bg-side': 'bg-white dark:bg-[#232324]',
  },
  rules: [
    [/^slide-enter-(\d+)$/, ([_, n]) => ({
      '--enter-stage': n,
    })],
  ],
  presets: [
    presetAttributify(),
    presetUno(),
    presetIcons({
      scale: 1.2,
    }),
    presetWind(),
    presetWebFonts({
      fonts: {
        sans: 'Inter',
        mono: 'DM Mono',
      },
    }),
  ],
  theme: {
    breakpoints: {
      xs: '320px',
      sm: '640px',
      md: '1024px',
      lg: '1280px',
      xl: '1536px',
      xxl: '1920px',
    },
    colors: {
      primary_1: 'rgb(var(--primary-1))',
      primary_2: 'rgb(var(--primary-2))',
      primary_3: 'rgb(var(--primary-3))',
      primary_4: 'rgb(var(--primary-4))',
      primary_5: 'rgb(var(--primary-5))',
      primary_6: 'rgb(var(--primary-6))',
      primary_7: 'rgb(var(--primary-7))',
      primary_8: 'rgb(var(--primary-8))',
      primary_9: 'rgb(var(--primary-9))',
      primary_10: 'rgb(var(--primary-10))',
      primary: 'rgb(var(--primary-6))',
      primary_hover: 'rgb(var(--primary-5))',
      primary_click: 'rgb(var(--primary-7))',
      success: 'rgb(var(--success-6))',
      success_hover: 'rgb(var(--success-5))',
      success_click: 'rgb(var(--success-7))',
      warning: 'rgb(var(--warning-6))',
      warning_hover: 'rgb(var(--warning-5))',
      warning_click: 'rgb(var(--warning-7))',
      info: 'rgb(var(--info-6))',
      info_hover: 'rgb(var(--info-5))',
      info_click: 'rgb(var(--info-7))',
      danger: 'rgb(var(--danger-6))',
      danger_hover: 'rgb(var(--danger-5))',
      danger_click: 'rgb(var(--danger-7))',
    },
  },
})
