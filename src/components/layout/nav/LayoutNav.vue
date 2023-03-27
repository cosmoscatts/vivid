<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

const uiStore = useUiStore()
const isVertical = computed(() => uiStore.settings.layout === 'vertical')
const showPageHeader = computed(() => uiStore.settings.showPageHeader && isVertical.value && isPC.value)
const logoWidth = computed(() => isPC.value
  ? params.sideWidth
  : params.sideCollapsedWidth,
)
</script>

<template>
  <div flex-center pr5 border-b="1px solid [var(--color-border)]">
    <LayoutLogo v-if="!isVertical || isMobile" :style="{ width: `${logoWidth}px` }" />
    <LayoutMenu v-if="!isVertical && isPC" mode="horizontal" mr2 :style="{ width: `calc(100% - 500px)` }" />
    <LayoutNavCollapseToggle v-if="isVertical && isPC" mx4 />
    <LayoutPageHeader v-if="showPageHeader" mt4px />
    <div flex-auto />
    <div v-if="isPC" flex-y-center>
      <LayoutNavGithub mr4 />
      <LayoutNavBell mr4 />
      <LayoutNavFullscreen mr4 />
      <LayoutNavDarkToggle mr4 />
      <LayoutNavDropdown />
    </div>
    <div v-else flex-y-center>
      <LayoutSmallScreenSide />
    </div>
  </div>
</template>
