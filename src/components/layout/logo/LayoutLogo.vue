<script setup lang="ts">
import { LAYOUT_PARAMS, LOGO, SHORT_LOGO } from '~/constants'

const uiStore = useUiStore()
const isShort = $computed(() => {
  if (isMobile.value || uiStore.settings.layout === 'vertical-mix') return true
  if (uiStore.settings.layout === 'horizontal-mix') return false
  return uiStore.collapseSide.state
})
const currentLogo = computed(() => [LOGO, SHORT_LOGO][Number(isShort)])
</script>

<template>
  <div
    v-if="uiStore.settings.showLogo" flex-center py2px
    :class="['py2px', 'p4px'][Number(isShort)]"
    :style="{ height: `${LAYOUT_PARAMS.navHeight}px` }"
  >
    <img :src="currentLogo" alt="Logo" h-full>
  </div>
</template>
