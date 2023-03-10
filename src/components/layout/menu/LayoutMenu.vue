<script setup lang="ts">
import { LAYOUT_PARAMS, MENU_ICON_MAP } from '~/constants'
import type { Menu } from '~/types'

const { mode, noCollapse = false } = defineProps<{ mode: 'vertical' | 'horizontal'; noCollapse?: boolean }>()

const route = useRoute()
const uiStore = useUiStore()
const authStore = useAuthStore()

const selectedKeys = computed(() => {
  const fn: (item: Menu) => Menu[] = (item: Menu) => {
    if (!item.children?.length) return [item]
    return [
      item,
      ...item.children.flatMap((i: Menu) => fn(i), Infinity),
    ]
  }

  return authStore.menus
    .flatMap(fn, Infinity)
    .filter(item => item.path === route.path)
    .map(item => item.id)
    .filter(notNullish)
})

const collapse = computed(() => {
  if (noCollapse) return false
  return uiStore.collaspeSide.state
})

function hasIcon(icon: string) {
  if (!icon) return false
  return Object.keys(MENU_ICON_MAP).includes(item.icon)
}

function formatIcon(icon: string) {
  return MENU_ICON_MAP[icon]
}
</script>

<template>
  <div
    hw-full flex-x-center bg-transparent of-hidden
    :class="['', 'items-center'][Number(mode === 'horizontal')]"
  >
    <a-menu
      hw-full :mode="mode"
      auto-open accordion auto-open-selected
      :selected-keys="selectedKeys"
      :collapsed="collapse"
      :collapsed-width="LAYOUT_PARAMS.sideMenuCollapsedWidth"
      :breakpoint="['', 'lg'][Number(mode === 'vertical')]"
      @collapse="uiStore.collaspeSide.toggle"
    >
      <template v-for="{ id, title, path, icon, children } of authStore.menus">
        <a-sub-menu v-if="children?.length" :key="id" :title="title">
          <template v-if="hasIcon(icon)" #icon>
            <Component :is="formatIcon(icon)" />
          </template>
          <RouterLink v-for="child of children" :key="child.path" :to="child.path">
            <a-menu-item :key="child.id">
              <template v-if="hasIcon(child.icon)" #icon>
                <Component :is="formatIcon(child.icon)" />
              </template>
              {{ child.title }}
            </a-menu-item>
          </RouterLink>
        </a-sub-menu>
        <RouterLink v-else :key="path" :to="path">
          <a-menu-item :key="id">
            <template v-if="hasIcon(icon)" #icon>
              <Component :is="formatIcon(icon)" />
            </template>
            {{ title }}
          </a-menu-item>
        </RouterLink>
      </template>
    </a-menu>
  </div>
</template>
