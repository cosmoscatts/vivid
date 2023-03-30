<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'
const uiStore = useUiStore()
</script>

<template>
  <LayoutProvider>
    <template #side>
      <LayoutSide v-if="uiStore.settings.layout === 'vertical' && isPC" absolute left-0 top-0 />
    </template>
    <template #header>
      <LayoutNav w-full :style="{ height: `${params.navHeight}px` }" />
      <LayoutTabs v-show="uiStore.settings.showTabs" w-full :style="{ height: `${params.tabHeight}px` }" />
    </template>
  </LayoutProvider>
</template>
