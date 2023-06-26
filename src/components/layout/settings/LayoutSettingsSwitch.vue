<script setup lang="ts">
defineProps<{
  name?: string
  disabled?: boolean
}>()
const { modelValue } = defineModels<{ modelValue: boolean }>()
const switchColors = {
  checked: 'rgb(var(--primary-6))',
  unchecked: 'rgb(var(--gray-6))',
}
</script>

<template>
  <div my3 flex-y-center justify-between>
    <span>
      {{ name }}
    </span>
    <a-switch
      type="round"
      :model-value="modelValue"
      :disabled="disabled"
      :checked-color="switchColors.checked"
      :unchecked-color="switchColors.unchecked"
      @change="(value) => modelValue = Boolean(value)"
    />
  </div>
</template>
