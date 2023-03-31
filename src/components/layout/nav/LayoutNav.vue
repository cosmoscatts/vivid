<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

const uiStore = useUiStore()
const isHorizontal = computed(() => uiStore.settings.layout === 'horizontal')
const isHorizontalOrMix = computed(() => uiStore.settings.layout.includes('horizontal'))
const showCollapseToggle = computed(() => {
  const t = uiStore.settings.layout === 'vertical' || uiStore.settings.layout === 'horizontal-mix'
  return t && isPC.value
})
const showPageHeader = computed(() => {
  const t = uiStore.settings.layout.includes('vertical') || uiStore.settings.layout === 'horizontal-mix'
  return uiStore.settings.showPageHeader && t && isPC.value
})
const logoWidth = computed(() => isPC.value
  ? params.sideWidth
  : params.sideCollapsedWidth,
)
</script>

<template>
  <div flex-center pr5 border-b="1px solid [var(--color-border)]">
    <LayoutLogo v-if="isHorizontalOrMix || isMobile" :style="{ width: `${logoWidth}px` }" />
    <LayoutMenu v-if="isHorizontal && isPC" mode="horizontal" mr2 :style="{ width: `calc(100% - 500px)` }" />
    <LayoutNavCollapseToggle v-if="showCollapseToggle" mx4 />
    <LayoutPageHeader v-if="showPageHeader" mt4px ml4 />
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
