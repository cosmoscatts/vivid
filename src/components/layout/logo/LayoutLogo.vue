<script setup lang="ts">
import { LAYOUT_PARAMS, LOGO, SHORT_LOGO } from '~/constants'

const uiStore = useUiStore()
const currentLogo = computed(() => {
  return [LOGO, SHORT_LOGO][Number(uiStore.collapseSide.state || isMobile.value)]
})
</script>

<template>
  <div
    v-if="uiStore.settings.showLogo" flex-center
    :style="{ height: `${LAYOUT_PARAMS.navHeight}px` }"
  >
    <img :src="currentLogo" alt="Logo" h-full>
  </div>
</template>
