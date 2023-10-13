<script setup lang="ts">
import { defaultThemeColors } from '~/constants'

const { modelValue } = defineModels<{ modelValue: string }>()
const isChecked = (prop: string) => modelValue.value === prop
function change(value: string) {
  modelValue.value = value
}
</script>

<template>
  <div grid="~ cols-3 gap4" border rounded border-base p="x4 y3">
    <div v-for="{ prop, name, hex } of defaultThemeColors" :key="prop" flex>
      <div class="h-20px w-20px flex-center cursor-pointer rounded-2px shadow" :style="{ backgroundColor: hex }" @click="change(prop)">
        <div v-if="isChecked(prop)" i-carbon-checkmark text="14px white" />
      </div>
      <span ml2 text-sm>{{ name }}</span>
    </div>
  </div>
</template>
