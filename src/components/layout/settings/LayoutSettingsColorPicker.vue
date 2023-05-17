<script setup lang="ts">
import { defaultThemeColors } from '~/config'

const { modelValue } = defineModels<{ modelValue: string }>()
const isChecked = (prop: string) => modelValue.value === prop
function change(value: string) {
  modelValue.value = value
}
</script>

<template>
  <div grid="~ cols-3 gap4" rounded border="1px [var(--color-border)]" p="x4 y3">
    <div v-for="{ prop, name, hex } of defaultThemeColors" :key="prop" flex>
      <div class="flex-center w-20px h-20px rounded-2px shadow cursor-pointer" :style="{ backgroundColor: hex }" @click="change(prop)">
        <div v-if="isChecked(prop)" i-carbon-checkmark text="14px white" />
      </div>
      <span text-sm ml2>{{ name }}</span>
    </div>
  </div>
</template>
