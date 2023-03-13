<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

defineProps<{ targetContainer: string }>()
</script>

<template>
  <a-back-top
    :target-container="targetContainer"
    :visible-height="params.backTopVisibilityHeight"
  >
    <a-button
      fixed shadow-md
      :style="{
        boxShadow: '0 2px 12px #0000001a',
        background: 'var(--color-bg-5)',
        border: '1px solid var(--color-fill-3)',
        right: `${params.backTopRight}px`,
        bottom: `${params.backTopBottom}px`,
      }"
      size="large"
      shape="circle"
    >
      <IconUp :stroke-width="8" />
    </a-button>
  </a-back-top>
</template>
