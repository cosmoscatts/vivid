<script setup lang="ts">
import type { SelectOptionData } from '@arco-design/web-vue'

defineProps<{
  name?: string
  options: SelectOptionData[]
  disabled?: boolean
}>()
const modelValue = defineModel<string>()
</script>

<template>
  <div my3 flex-y-center justify-between>
    <span>
      {{ name }}
    </span>
    <a-select
      :style="{ width: '120px' }"
      :placeholder="name"
      :model-value="modelValue"
      :options="options"
      :disabled="disabled"
      @change="(value) => modelValue = String(value)"
    />
  </div>
</template>
