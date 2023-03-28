<script setup lang="ts">
import { LAYOUT_PARAMS, LOGO, SHORT_LOGO } from '~/constants'

const uiStore = useUiStore()
const isShort = $computed(() => {
  if (uiStore.settings.layout === 'horizontal-mix' || isMobile.value) return false
  return uiStore.collapseSide.state
})
const currentLogo = computed(() => [LOGO, SHORT_LOGO][Number(isShort)])
</script>

<template>
  <div
    v-if="uiStore.settings.showLogo" flex-center py2px
    :class="['py2px', 'p6px'][Number(isShort)]"
    :style="{ height: `${LAYOUT_PARAMS.navHeight}px` }"
  >
    <img :src="currentLogo" alt="Logo" h-full>
  </div>
</template>
