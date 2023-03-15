<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'
const refButton = ref()
const hover = useElementHover(refButton)
const showSettingsDrawer = ref(false)
</script>

<template>
  <div fixed :style="{ right: `${params.settingsButtonRight}px`, bottom: `${params.settingsButtonBottom}px` }" z1000>
    <a-button
      v-if="!showSettingsDrawer"
      ref="refButton"
      size="large"
      :shape="hover ? 'round' : 'circle'"
      :style="{
        boxShadow: '0 2px 12px #0000001a',
        background: 'var(--color-bg-5)!important',
        border: '1px solid var(--color-fill-3)!important',
      }"
      @click="showSettingsDrawer = true; hover = false"
    >
      <IconSkin />
      <span v-if="hover" ml-2>页面风格</span>
    </a-button>
  </div>

  <LayoutSettingsDrawer v-model:visible="showSettingsDrawer" />
</template>
