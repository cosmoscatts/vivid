<script setup lang="ts">
const route = useRoute()
const uiStore = useUiStore()
let data = $ref<{ title: string; icon?: string }[]>([])
const getBreadCrumbs = () => {
  data = getMatchedMenuItemsIfParentExist(route.path)
    .map(i => ({
      title: i.title,
      icon: i.icon,
    }))
}
getBreadCrumbs()
watch(() => route.path, (path) => {
  if (!path.startsWith('/redirect/')) {
    getBreadCrumbs()
  }
})
</script>

<template>
  <a-page-header :show-back="false" :style="{ padding: '0px' }">
    <template #breadcrumb>
      <a-breadcrumb>
        <a-breadcrumb-item v-for="item of data" :key="item.title" flex-y-center>
          <component :is="formatMenuIcon(item.icon!)" v-if="uiStore.settings.showPageHeaderIcon && hasMenuIcon(item.icon)" mr2 />
          {{ item.title }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </template>
  </a-page-header>
</template>

<style scoped>
:deep(.arco-page-header-header) {
  height: 0px;
}
:deep(.arco-page-header-wrapper) {
  padding-right: 0px;
  padding-left: 4px;
}
</style>
