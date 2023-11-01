<script setup lang="ts">
import type { StyleValue } from 'vue'

defineOptions({
  inheritAttrs: true,
})

const { color = 'primary', icon, hoverIcon = '', classStr = '', style = {} } = defineProps<{
  color?: string
  text?: string
  icon?: string
  hoverIcon?: string
  classStr?: string
  style?: StyleValue
}>()

defineEmits<{
  (event: 'click'): void
}>()
const refEl = ref()
const isHovered = useElementHover(refEl)
const hoverIconStr = computed(() => {
  if (hoverIcon === '') return icon
  return `${hoverIcon} text-${color}`
})
</script>

<template>
  <a ref="refEl" :class="`flex-center btn-${color} ${classStr}`" :style="style" @click="$emit('click')">
    <div
      v-if="icon && !isHovered"
      :class="`${icon}`"
      mr2 transition-all duration-200 ease-out
    />
    <div
      v-if="icon && isHovered"
      :class="`${hoverIconStr}`"
      mr2 transition-all duration-200 ease-out
    />
    <slot>
      {{ text }}
    </slot>
  </a>
</template>
