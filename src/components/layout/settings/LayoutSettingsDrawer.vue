<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

const { visible } = defineModels<{ visible: boolean }>()
const uiStore = useUiStore()
function saveCurrentSettings() {
  const loading = Message.loading('正在更新配置')
  useTimeoutFn(() => {
    uiStore.applyCopySettings()
    loading.close()
    Message.success('应用成功')
    visible.value = false
  }, 1000)
}
</script>

<template>
  <a-drawer v-model:visible="visible" :width="params.settingsDrawerWidth" unmount-on-close>
    <template #title>
      页面风格设置
    </template>

    <LayoutSettingsDrawerContent />

    <template #footer>
      <a-space direction="vertical" fill>
        <a-button type="primary" long @click="saveCurrentSettings">
          <span text="dark dark:white" font-bold>应用当前配置</span>
        </a-button>
        <a-button type="primary" status="warning" long @click="uiStore.resetCopySettings">
          <span text="dark dark:white" font-bold>重置当前配置</span>
        </a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
