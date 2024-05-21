<script setup lang="ts">
import { APP_META, LAYOUT_PARAMS, defaultThemeColors } from '~/constants'

const uiStore = useUiStore()
const isShort = computed(() => {
  if (isMobile.value || uiStore.settings.layout === 'vertical-mix') return true
  if (uiStore.settings.layout === 'horizontal-mix') return false
  return uiStore.collapseSide.state
})

const primaryColor = computed(() => {
  return defaultThemeColors.find(i => i.prop === uiStore.settings.primaryColor)!.hex
})
</script>

<template>
  <div
    v-if="uiStore.settings.showLogo" py2px
    :class="['py2px', 'p4px'][Number(isShort)]"
    :style="{ height: `${LAYOUT_PARAMS.navHeight}px` }"
  >
    <div h-full flex-center gap-4 font-bold>
      <svg size-24px viewBox="0 0 49 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 11.6H0.549654C1.28204 5.32267 6.64297 0.5 13.1 0.5H48.4504C47.718 6.77733 42.357 11.6 35.9 11.6H35.4C33.6239 11.6 32.2 13.0239 32.2 14.8C32.2 16.5761 33.6239 18 35.4 18H35.9C42.357 18 47.718 22.8227 48.4504 29.1H35.5C33.7239 29.1 32.3 30.5238 32.3 32.3C32.3 34.0761 33.7239 35.5 35.5 35.5H48.4504C47.718 41.7773 42.357 46.6 35.9 46.6H0.549654C1.28204 40.3227 6.64297 35.5 13.1 35.5H13.6C15.3761 35.5 16.8 34.0761 16.8 32.3C16.8 30.5239 15.3761 29.1 13.6 29.1H13.1C6.64297 29.1 1.28204 24.2773 0.549654 18H13.5C15.2761 18 16.7 16.5761 16.7 14.8C16.7 13.0239 15.2761 11.6 13.5 11.6Z" :fill="primaryColor" :stroke="primaryColor" />
      </svg>

      <div v-if="!isShort" text-lg>
        {{ APP_META.name }}
      </div>
    </div>
  </div>
</template>
