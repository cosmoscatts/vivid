<script setup lang="ts">
const uiStore = useUiStore()
const { loading, startLoading, endLoading } = useLoading()
function handleRefresh() {
  startLoading()
  uiStore.reloadPage()
  useTimeoutFn(endLoading, 1000)
}
</script>

<template>
  <a-tooltip content="重新加载" position="bl">
    <div h-full w50px flex-center cursor-pointer class="hover:bg-#f6f6f6 dark:hover:bg-#333" @click="handleRefresh">
      <div i-mdi-refresh text-lg icon-btn :class="{ 'animate-spin': loading }" />
    </div>
  </a-tooltip>
</template>
