<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

const uiStore = useUiStore()
const isVertical = computed(() => uiStore.settings.layout === 'vertical')
const logoWidth = computed(() => isPC.value
  ? params.sideWidth
  : params.sideCollapsedWidth,
)
</script>

<template>
  <div flex-center pr5 border-b="1px solid [var(--color-border)]">
    <LayoutLogo v-if="!isVertical || isMobile" :style="{ width: `${logoWidth}px` }" />
    <LayoutMenu v-if="!isVertical && isPC" mx4 />
    <LayoutPageHeader v-if="isVertical && isPC" mt3px />
    <div flex-auto />
    <div v-if="isPC" flex-y-center>
      <LayoutGithub mr4 />
      <LayoutBell mr4 />
      <LayoutFullScreen mr4 />
      <LayoutDarkToggle mr4 />
      <LayoutDropdown />
    </div>
    <div v-else flex-y-center>
      <LayoutSmallScreenSide />
    </div>
  </div>
</template>
