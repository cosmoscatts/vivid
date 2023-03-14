<script setup lang="ts">
const uiStore = useUiStore()
</script>

<template>
  <a-button shape="round" @click="uiStore.collapseSide.toggle">
    <IconCaretRight v-if="uiStore.collapseSide.state" />
    <IconCaretLeft v-else />
  </a-button>
</template>
