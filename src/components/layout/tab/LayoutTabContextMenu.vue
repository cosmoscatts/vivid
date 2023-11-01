<script setup lang="ts">
const props = defineProps<{
  index: number
  tabs: Tab[]
  hasLeftTabs: boolean
  hasRightTabs: boolean
}>()

const router = useRouter()
const tabStore = useTabStore()

function handleRefresh() {
  const currentTab = props.tabs[props.index]
  if (!currentTab) return
  nextTick(() => router.replace({
    path: `/redirect${currentTab.path}`,
  }))
}

function handleCloseLeft() {
  const currentTab = props.tabs[props.index]
  if (!currentTab || !props.hasLeftTabs) return
  tabStore
    .removeListTabs(props.tabs.slice(0, props.index))
    .then(() => router.push(currentTab.path))
}

function handleCloseRight() {
  const currentTab = props.tabs[props.index]
  if (!currentTab || !props.hasRightTabs) return
  tabStore
    .removeListTabs(props.tabs.slice(props.index + 1))
    .then(() => router.push(currentTab.path))
}

function handleCloseOthers() {
  const currentTab = props.tabs[props.index]
  if (!currentTab) return
  tabStore
    .removeOtherTabs(currentTab)
    .then(() => router.push(currentTab.path))
}
</script>

<template>
  <a-doption @click="handleRefresh">
    <template #icon>
      <IconRefresh />
    </template>
    刷新当前
  </a-doption>
  <a-doption :disabled="!hasLeftTabs" @click="handleCloseLeft">
    <template #icon>
      <IconArrowLeft />
    </template>
    关闭左边
  </a-doption>
  <a-doption :disabled="!hasRightTabs" @click="handleCloseRight">
    <template #icon>
      <IconArrowRight />
    </template>
    关闭右边
  </a-doption>
  <a-doption :disabled="tabs.length <= 1" @click="handleCloseOthers">
    <template #icon>
      <IconCloseCircle />
    </template>
    关闭其他
  </a-doption>
</template>
