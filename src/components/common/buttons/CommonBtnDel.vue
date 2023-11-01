<script setup lang="ts">
defineEmits<{
  (event: 'click'): void
}>()
</script>

<template>
  <a class="group flex-center select-none btn-red" @click="$emit('click')">
    <div
      group-hover="i-ri-delete-bin-6-fill?mask text-red"
      i-ri-delete-bin-6-line mr2 transition-all duration-200 ease-out
    />
    删除
  </a>
</template>
