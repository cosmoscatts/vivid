<script setup lang="ts">
import type { Menu } from '~/types'
import { APP_META as meta, LAYOUT_PARAMS as params } from '~/constants'

const props = defineProps<{
  visible: boolean
  menus: Menu[]
}>()

const uiStore = useUiStore()
const showDrawer = computed(() => (props.visible && props.menus.length) || uiStore.mixSideFixed)
</script>

<template>
  <div
    relative h-full border-l border-base transition-width duration-300 ease-in-out
    :style="{ width: uiStore.mixSideFixed ? `${params.mixSideDrawerWidth}px` : '0px' }"
  >
    <div
      class="drawer-shadow absolute left-0 top-0 h-full flex-col items-stretch overflow-hidden whitespace-nowrap bg-side"
      :class="showDrawer ? 'border-r border-base' : ''"
      :style="{ width: showDrawer ? `${params.mixSideDrawerWidth}px` : '0px' }"
    >
      <header flex-y-center justify-between px5px :style="{ height: `${params.navHeight}px` }">
        <h2 pl-8px text-sm text-primary font-bold>
          <CommonEllipsis :content="meta.name" />
        </h2>
        <div cursor-pointer px-8px text-14px text-gray-600 @click="uiStore.toggleMixSideFixed">
          <div v-if="uiStore.mixSideFixed" i-mdi-pin-off bg-red />
          <div v-else i-mdi-pin />
        </div>
      </header>
      <LayoutMenu mode="vertical" no-collapse enable-props-menu :menu-children="menus" flex-1 />
    </div>
  </div>
</template>

<style scoped>
.drawer-shadow {
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
</style>
