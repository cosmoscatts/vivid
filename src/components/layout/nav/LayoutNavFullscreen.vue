<script setup lang="ts">
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
  <button
    icon-btn text-lg
    :class="isFullscreen
      ? 'i-ri-fullscreen-exit-line'
      : 'i-ri-fullscreen-line'"
    @click="toggle"
  />
</template>
