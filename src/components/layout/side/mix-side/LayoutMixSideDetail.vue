<script setup lang="ts">
import { mixColor, mixRatio } from '../../tab/constants'
import { defaultThemeColors } from '~/constants'
import { useMixinColor } from '~/utils'

const props = defineProps<{
  title: string
  matchPathList: string[]
  activePath: string
  icon?: string
  isMini?: boolean
  isSelected?: boolean
}>()

const uiStore = useUiStore()

const { bool: isHover, setTrue, setFalse } = useBool()

const isActive = computed(() => props.matchPathList.includes(props.activePath))

const fillColor = computed(() => {
  const index = Number(isDark.value)
  return isActive.value
    ? useMixinColor(
      mixColor[index],
      defaultThemeColors.find(i => i.prop === uiStore.settings.primaryColor)!.hex,
      mixRatio[index],
    )
    : 'transparent'
})
</script>

<template>
  <div mb-6px cursor-pointer px-4px @mouseenter="setTrue" @mouseleave="setFalse">
    <div
      flex-center flex-col rounded-2px bg-transparent py-12px transition-colors duration-300 ease-in-out
      :class="{ 'text-primary': isHover || isSelected || isActive }"
      :style="{ backgroundColor: fillColor }"
    >
      <component :is="formatMenuIcon(icon!)" v-if="hasMenuIcon(icon)" :class="[isMini ? 'text-16px' : 'text-20px']" />
      <p
        overflow-hidden text-12px transition-height duration-300 ease-in-out
        :class="[isMini ? 'h-0 pt-0' : 'h-24px pt-4px']"
      >
        {{ title }}
      </p>
    </div>
  </div>
</template>
