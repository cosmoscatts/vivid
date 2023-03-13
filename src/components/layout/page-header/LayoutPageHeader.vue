<script setup lang="ts">
import type { RouteLocationMatched } from 'vue-router'

const route = useRoute()
let data = $ref<{ title: string; icon?: string }[]>([])
const getBreadCrumbs = () => {
  const menus = getFlattenMenuTree()
  const matched = route
    .matched
    .filter((i: RouteLocationMatched) => !!i.meta?.title)
  if (!matched.length) return
  data = [...new Set(matched.map(i => i.meta.title as string)).values()]
  // matched.map((i:RouteLocationMatched) => ({
  //   title: i.meta.title,
  //   icon: menus.find(j => j.path === i.path)?.icon
  // }))
}
getBreadCrumbs()
watch(() => route.path, (path) => {
  if (!path.startsWith('/redirect/')) {
    getBreadCrumbs()
  }
})

function hasIcon(icon?: string) {
  if (!icon) return false
  return Object.keys(MENU_ICON_MAP).includes(icon)
}

function formatIcon(icon: string) {
  return MENU_ICON_MAP[icon]
}
</script>

<template>
  <a-page-header :show-back="false" :style="{ padding: '0px' }">
    <template #breadcrumb>
      <a-breadcrumb>
        <a-breadcrumb-item v-for="title of data" :key="title">
          <IconStamp mr1 />
          {{ title }}
        </a-breadcrumb-item>
      </a-breadcrumb>
    </template>
  </a-page-header>
</template>

<style scoped>
:deep(.arco-page-header-header) {
  height: 0px;
}
</style>
