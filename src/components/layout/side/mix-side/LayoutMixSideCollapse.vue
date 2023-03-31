<script lang="ts" setup>
const uiStore = useUiStore()
</script>

<template>
  <a-button type="text" flex-center @click="uiStore.collapseSide.toggle">
    <div v-if="uiStore.collapseSide.state" i-ph-caret-double-right-bold text-16px />
    <div v-else i-ph-caret-double-left-bold text-16px />
  </a-button>
</template>
