<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

const { showLogo = true } = defineProps<{ showLogo?: boolean }>()
const uiStore = useUiStore()

const menuStyle = computed(() => {
  const overflow = 'hidden auto'
  if (uiStore.settings.layout === 'vertical' && !uiStore.settings.showLogo) {
    return {
      height: '100vh',
      overflow,
    }
  }
  return {
    height: `calc(100vh - ${params.navHeight}px)`,
    overflow,
  }
})
</script>

<template>
  <a-layout-sider
    border-r="1px solid [var(--color-border)]"
    collapsible hide-trigger h-full of-hidden bg-side
    :width="params.sideWidth"
    :collapsed-width="params.sideCollapsedWidth"
    :collapsed="uiStore.collapseSide.state"
  >
    <div flex="x-center col" of-hidden>
      <LayoutLogo v-if="showLogo" />
      <LayoutMenu mode="vertical" :style="menuStyle" />
    </div>
  </a-layout-sider>
</template>
