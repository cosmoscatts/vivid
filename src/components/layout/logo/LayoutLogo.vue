<script setup lang="ts">
import { APP_META, LAYOUT_PARAMS, LOGO } from '~/constants'

const uiStore = useUiStore()
const isShort = $computed(() => {
  if (isMobile.value || uiStore.settings.layout === 'vertical-mix') return true
  if (uiStore.settings.layout === 'horizontal-mix') return false
  return uiStore.collapseSide.state
})
</script>

<template>
  <div
    v-if="uiStore.settings.showLogo" py2px
    :class="['py2px', 'p4px'][Number(isShort)]"
    :style="{ height: `${LAYOUT_PARAMS.navHeight}px` }"
  >
    <div flex-center gap-4 font-bold>
      <img :src="LOGO" alt="Logo" h-46px>
      <div v-if="!isShort">
        {{ APP_META.name }}
      </div>
    </div>
  </div>
</template>
