<script setup lang="ts">
import type { StyleValue } from 'vue'
import { addColorAlpha } from '~/utils'
import { defaultThemeColors } from '~/config'

const props = defineProps<{
  title: string
  active: boolean
  icon?: string
}>()
const refTab = ref()
const uiStore = useUiStore()
const hover = useElementHover(refTab)
const tabStyle = computed(() => {
  const style: StyleValue = {}
  const color = defaultThemeColors.find(i => i.prop === uiStore.settings.primaryColor)!.hex
  if (props.active) {
    style.backgroundColor = addColorAlpha(color, [0.1, 0.15][Number(isDark.value)])
  }
  if (props.active || hover.value) {
    style.borderColor = addColorAlpha(color, 0.3)
  }
  return style
})
</script>

<template>
  <span
    ref="refTab"
    flex="center nowrap"
    lt-sm="!min-w-70px" px2 truncate
    text="13px hover:primary"
    border="1px #e5e7eb dark:#ffffff3d"
    :style="tabStyle"
    :class="{ 'text-primary': active }"
  >
    <component :is="formatMenuIcon(icon!)" v-if="hasMenuIcon(icon)" mr1 />
    {{ title }}
    <LayoutTabClose />
  </span>
</template>
