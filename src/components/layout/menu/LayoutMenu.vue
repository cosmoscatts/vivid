<script setup lang="ts">
import { LAYOUT_PARAMS } from '~/constants'

const { mode, noCollapse = false } = defineProps<{ mode: 'vertical' | 'horizontal'; noCollapse?: boolean }>()

const route = useRoute()
const uiStore = useUiStore()
const authStore = useAuthStore()

const selectedKeys = computed(() => {
  return getFlattenMenuTree()
    .filter(item => item.path === route.path)
    .map(item => item.id)
    .filter(notNullish)
})

const collapse = computed(() => {
  if (noCollapse) return false
  return uiStore.collapseSide.state
})
</script>

<template>
  <div
    hw-full flex-x-center bg-transparent of-hidden
    :class="['', 'items-center'][Number(mode === 'horizontal')]"
  >
    <a-menu
      :mode="mode"
      auto-open accordion auto-open-selected
      :selected-keys="selectedKeys"
      :collapsed="collapse"
      :collapsed-width="LAYOUT_PARAMS.sideMenuCollapsedWidth"
      :breakpoint="['', 'lg'][Number(mode === 'vertical')]"
      @collapse="uiStore.collapseSide.toggle"
    >
      <template v-for="{ id, title, path, icon, children } of authStore.menus">
        <a-sub-menu v-if="children?.length" :key="String(id)" :title="title">
          <template v-if="hasMenuIcon(icon)" #icon>
            <Component :is="formatMenuIcon(icon!)" />
          </template>
          <RouterLink v-for="child of children" :key="child.path" :to="child.path!">
            <a-menu-item :key="String(child.id)">
              <template v-if="hasMenuIcon(child.icon)" #icon>
                <Component :is="formatMenuIcon(child.icon!)" />
              </template>
              {{ child.title }}
            </a-menu-item>
          </RouterLink>
        </a-sub-menu>
        <RouterLink v-else :key="path" :to="path!">
          <a-menu-item :key="String(id)">
            <template v-if="hasMenuIcon(icon)" #icon>
              <Component :is="formatMenuIcon(icon!)" />
            </template>
            {{ title }}
          </a-menu-item>
        </RouterLink>
      </template>
    </a-menu>
  </div>
</template>
