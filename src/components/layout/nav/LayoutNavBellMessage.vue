<script setup lang="ts">
import type { BellData, BellDataType } from './interfaces'

defineProps<{
  data: BellData[]
  type: BellDataType
}>()
function formatIcon(key: BellDataType) {
  return {
    notification: 'i-carbon-chat',
    message: 'i-carbon-user',
    todo: 'i-carbon-checkbox-checked',
  }[key]
}
</script>

<template>
  <a-list :max-height="360" w-full h360px cursor-pointer>
    <a-list-item
      v-for="{ title, date } in data"
      :key="title"
      hover="bg-[var(--color-bg-3)]"
    >
      <a-list-item-meta :title="title" :description="formatDate(date)">
        <template #avatar>
          <div :class="formatIcon(type)" text="36px primary" />
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
