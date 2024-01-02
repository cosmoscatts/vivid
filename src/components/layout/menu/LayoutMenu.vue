<script setup lang="ts">
import { LAYOUT_PARAMS } from '~/constants'
import type { Menu } from '~/types'

defineOptions({
  inheritAttrs: true,
})

const props = defineProps<{
  mode: 'vertical' | 'horizontal'
  noCollapse?: boolean
  menuChildren?: Menu[] // `vertical-mix` 菜单抽屉传递的子菜单组
  enablePropsMenu?: boolean
}>()

const route = useRoute()
const uiStore = useUiStore()
const authStore = useAuthStore()

const selectedKeys = computed(() => {
  return getUserFlattenMenuTree()
    .filter(item => item.path === route.path)
    .map(item => String(item.id))
    .filter(notNullish)
})

const collapse = computed(() => {
  if (props.noCollapse) return false
  return uiStore.collapseSide.state
})

const menus = computed(() => {
  if (props.enablePropsMenu) return props.menuChildren
  return authStore.menus
})
</script>

<template>
  <div
    hw-full flex-x-center of-hidden bg-transparent
    :class="['', 'items-center'][Number(mode === 'horizontal')]"
  >
    <a-menu
      :mode="mode"
      auto-open accordion auto-open-selected
      :selected-keys="selectedKeys"
      :collapsed="collapse"
      :collapsed-width="LAYOUT_PARAMS.sideMenuCollapsedWidth"
      :breakpoint="['', 'lg'][Number(['vertical', 'horizontal-mix'].includes(mode))]"
      @collapse="uiStore.collapseSide.toggle"
    >
      <template v-for="{ id, title, path, icon, children } of menus">
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
