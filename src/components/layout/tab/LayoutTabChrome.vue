<script setup lang="ts">
import { defaultThemeColors } from '~/config'

defineProps<{
  title: string
  active: boolean
  last: boolean
  icon?: string
}>()
const refTab = ref()
const hover = useElementHover(refTab)
const uiStore = useUiStore()
const primaryColor = computed(() => {
  return defaultThemeColors.find(i => i.prop === uiStore.settings.primaryColor)!.hex
})
</script>

<template>
  <div
    ref="refTab" relative h34px px24px flex="inline y-center" m="r-[-18px]" cursor-pointer text="stone-600 dark:light-600/80"
    :class="{ 'z-10': active, 'z-9': hover, '!text-primary': active }"
  >
    <div absolute left-0 bottom-0 hw-full of-hidden>
      <LayoutTabChromeShape v-bind="{ hover, active, primaryColor }" />
    </div>
    <span relative z2 whitespace-nowrap flex="inline y-center">
      <component :is="formatMenuIcon(icon!)" v-if="hasMenuIcon(icon)" mr2 z2 :class="{ 'text-primary': active }" />
      {{ title }}
    </span>
    <LayoutTabClose />
    <div
      absolute right="[-2px]" z2 w20px h16px scale-x-5 bg="[#1f2225]" op100 transition="opacity 0.3s ease-in-out"
      :class="{
        '!op-0': hover || active || last,
        '!bg-[#595959]': isDark,
      }"
    />
  </div>
</template>
