<script setup lang="ts">
import type { SelectOptionData } from '@arco-design/web-vue'

defineProps<{
  name?: string
  options: SelectOptionData[]
  disabled?: boolean
}>()
const { modelValue } = defineModels<{ modelValue: string }>()
</script>

<template>
  <div flex-y-center justify-between my3>
    <span>
      {{ name }}
    </span>
    <a-select
      w-120px
      :placeholder="name"
      :model-value="modelValue"
      :options="options"
      :disabled="disabled"
      @change="(value) => modelValue = String(value)"
    />
  </div>
</template>
