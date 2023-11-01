<script setup lang="ts">
defineEmits<{
  (event: 'click'): void
}>()
</script>

<template>
  <a class="group flex-center btn-primary" @click="$emit('click')">
    <div
      group-hover="i-carbon-add-filled?mask text-primary"
      i-carbon-add-alt mr2 transition-all duration-200 ease-out
    />
    添加
  </a>
</template>
