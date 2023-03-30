<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'
const uiStore = useUiStore()
</script>

<template>
  <LayoutProvider>
    <template #side>
      <LayoutSide
        v-if="uiStore.settings.layout === 'horizontal-mix' && isPC"
        v-bind="{ showLogo: false }" absolute left-0 z-10
        :style="{
          top: `${params.navHeight}px`,
        }"
      />
    </template>
    <template #header>
      <LayoutNav bg-nav w-full absolute top-0 left-0 :style="{ height: `${params.navHeight}px` }" />
      <LayoutTabs
        v-show="uiStore.settings.showTabs" bg-nav w-full absolute top-0 left-0
        :style="{
          width: `calc(100% - ${[params.sideWidth, params.sideCollapsedWidth][Number(uiStore.collapseSide.state)]}px)`,
          height: `${params.tabHeight}px`,
          top: `${params.navHeight}px`,
          left: `${[params.sideWidth, params.sideCollapsedWidth][Number(uiStore.collapseSide.state)]}px`,
        }"
      />
    </template>
  </LayoutProvider>
</template>
