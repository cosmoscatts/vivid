<script setup lang="ts">
const handleCloseTab = inject('handleCloseTab') as () => void
</script>

<template>
  <span
    i-ri-close-fill hover="i-carbon-close-filled" ml1
    @click.prevent="handleCloseTab()"
  />
</template>
