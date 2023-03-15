<script setup lang="ts">
import { defaultThemeColors } from '~/config'
const { modelValue } = defineModel<{ modelValue: string }>()
</script>

<template>
  <a-radio-group
    :model-value="modelValue"
    flex="~ wrap" mt2 p="l-5 y-2" rounded border="2 [var(--color-border)]"
    @change="(value) => modelValue = String(value)"
  >
    <a-radio v-for="{ prop, name, hex } of defaultThemeColors" :key="prop" :value="prop" m="t-1 l-4">
      <div w12px h12px rounded-sm flex-inline mr1 :style="{ background: hex }" />
      <span text-sm>{{ name }}</span>
    </a-radio>
  </a-radio-group>
</template>
