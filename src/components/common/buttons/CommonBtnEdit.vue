<script setup lang="ts">
defineEmits<{
  (event: 'click'): void
}>()
</script>

<template>
  <a class="group flex-center select-none btn-yellow" @click="$emit('click')">
    <div
      group-hover="i-ri-edit-box-fill?mask text-yellow"
      i-ri-edit-box-line mr2 transition-all duration-200 ease-out
    />
    编辑
  </a>
</template>
