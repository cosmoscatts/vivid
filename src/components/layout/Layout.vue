<script setup lang="ts">
const uiStore = useUiStore()
</script>

<template>
  <LayoutProvider>
    <template v-if="uiStore.settings.layout === 'vertical' && isPC" #side>
      <LayoutSide />
    </template>
  </LayoutProvider>
</template>
