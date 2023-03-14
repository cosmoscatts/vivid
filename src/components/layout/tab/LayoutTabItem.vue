<script setup lang="ts">
import type { Tab } from '~/types'

const props = defineProps<{
  index: number
  title: string
  path: string
  icon?: string
  tabs: Tab[]
  chrome: boolean
  active: boolean
}>()

const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()

function handleCloseTab() {
  if (props.tabs.length === 1) {
    Message.warning('已经是最后一个标签了')
    return
  }
  const currentTab = props.tabs[props.index]
  if (!currentTab) return
  tabStore
    .removeOneTab(currentTab)
    .then(() => {
      if (currentTab.path === route.path) {
        const latest = props.tabs.slice(-1)[0] // 找到最后一个
        router.push(latest.path)
      }
    })
}

provide('handleCloseTab', handleCloseTab)
</script>

<template>
  <a-dropdown trigger="contextMenu" position="br">
    <RouterLink :to="{ path }">
      <LayoutTabButton v-if="!chrome" v-bind="{ title, active, icon }" />
      <LayoutTabChrome v-else v-bind="{ title, active, icon, last: index === tabs.length - 1 }" />
    </RouterLink>

    <template #content>
      <LayoutTabContextMenu
        v-bind="{
          index,
          tabs,
          hasLeftTabs: tabs.length > 1 && index > 0,
          hasRightTabs: tabs.length > 1 && index < tabs.length - 1,
        }"
      />
    </template>
  </a-dropdown>
</template>
