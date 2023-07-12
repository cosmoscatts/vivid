<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

const { showLogo = true } = defineProps<{ showLogo?: boolean }>()
const uiStore = useUiStore()
</script>

<template>
  <a-layout-sider
    of="x-hidden y-auto" border-r="1px solid [var(--color-border)]"
    collapsible hide-trigger h-full bg-side
    :width="params.sideWidth"
    :collapsed-width="params.sideCollapsedWidth"
    :collapsed="uiStore.collapseSide.state"
  >
    <div flex="x-center col" of-hidden>
      <LayoutLogo v-if="showLogo" />
      <LayoutMenu mode="vertical" />
    </div>
  </a-layout-sider>
</template>
