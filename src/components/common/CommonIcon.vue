<script setup lang="ts">
defineProps<{
  icon: string
}>()
defineOptions({
  inheritAttrs: true,
})
</script>

<template>
  <div :class="icon" />
</template>
