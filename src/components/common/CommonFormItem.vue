<script setup lang="ts">
import type { FieldRule } from '@arco-design/web-vue'
const {
  field,
  label,
  rules,
  hasRules = true,
  hideAsterisk = true,
  feedback = true,
  hideLabel = false,
} = defineProps<{
  field: string
  label: string
  rules?: FieldRule<any> | FieldRule<any>[]
  hasRules?: boolean
  hideAsterisk?: boolean
  feedback?: boolean
  hideLabel?: boolean
}>()
const defaultRules = computed(() => {
  if (!hasRules) return []
  return [{ required: true, message: `${label}是必须的` }]
})
defineOptions({
  inheritAttrs: true,
})
</script>

<template>
  <a-form-item
    :field="field"
    :label="label"
    :hide-asterisk="hideAsterisk"
    :feedback="feedback"
    :rules="[defaultRules, rules][Number(!!rules?.length)]"
    :validate-trigger="defaultValidateTrigger"
    :hide-label="hideLabel"
  >
    <slot />
  </a-form-item>
</template>
