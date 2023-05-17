<script setup lang="ts">
import { APP_META as meta, LAYOUT_PARAMS as params } from '~/constants'
import type { Menu } from '~/types'

const props = defineProps<{
  visible: boolean
  menus: Menu[]
}>()

const uiStore = useUiStore()
const showDrawer = computed(() => (props.visible && props.menus.length) || uiStore.mixSideFixed)
</script>

<template>
  <div
    relative h-full transition-width duration-300 ease-in-out border-l="1px solid [var(--color-border)]"
    :style="{ width: uiStore.mixSideFixed ? `${params.mxiSideDrawerWidth}px` : '0px' }"
  >
    <div
      class="drawer-shadow absolute left-0 top-0 flex-col items-stretch h-full whitespace-nowrap overflow-hidden bg-side"
      :style="{ width: showDrawer ? `${params.mxiSideDrawerWidth}px` : '0px' }"
    >
      <header flex-y-center justify-between px5px :style="{ height: `${params.navHeight}px` }">
        <h2 text-primary pl-8px text-24px font-bold>
          {{ meta.name }}
        </h2>
        <div px-8px text-14px text-gray-600 cursor-pointer @click="uiStore.toggleMixSideFixed">
          <div v-if="uiStore.mixSideFixed" i-mdi-pin-off />
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
