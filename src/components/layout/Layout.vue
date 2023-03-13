<script setup lang="ts">
const uiStore = useUiStore()
</script>

<template>
  <LayoutProvider>
    <template v-if="uiStore.settings.layout === 'vertical'" #side>
      <LayoutSide />
    </template>
  </LayoutProvider>
</template>
