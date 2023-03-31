<script setup lang="ts">
const props = defineProps<{
  title: string
  matchPathList: string[]
  activePath: string
  icon?: string
  isMini?: boolean
  isSelected?: boolean
}>()

const { bool: isHover, setTrue, setFalse } = useBool()

const isActive = computed(() => props.matchPathList.includes(props.activePath))
</script>

<template>
  <div mb-6px px-4px cursor-pointer @mouseenter="setTrue" @mouseleave="setFalse">
    <div
      flex-center flex-col py-12px rounded-2px bg-transparent transition-colors duration-300 ease-in-out
      :class="{ '!bg-primary_1': isActive, 'text-primary': isHover || isSelected || isActive }"
    >
      <component :is="formatMenuIcon(icon!)" v-if="hasMenuIcon(icon)" :class="[isMini ? 'text-16px' : 'text-20px']" />
      <p
        text-12px overflow-hidden transition-height duration-300 ease-in-out
        :class="[isMini ? 'h-0 pt-0' : 'h-24px pt-4px']"
      >
        {{ title }}
      </p>
    </div>
  </div>
</template>
