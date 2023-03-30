<script setup lang="ts">
import type { VNodeChild } from 'vue'

const props = defineProps<{
  routeName: string
  label: string
  activeRouteName: string
  icon?: () => VNodeChild
  isMini?: boolean
}>()

const { bool: isHover, setTrue, setFalse } = useBool()

const isActive = computed(() => props.routeName === props.activeRouteName)
</script>

<template>
  <div mb-6px px-4px cursor-pointer @mouseenter="setTrue" @mouseleave="setFalse">
    <div
      flex-center flex-col py-12px rounded-2px bg-transparent transition-colors duration-300 ease-in-out
      :class="{ 'text-primary !bg-primary': isActive, 'text-primary': isHover }"
    >
      <component :is="icon" :class="[isMini ? 'text-16px' : 'text-20px']" />
      <p
        text-12px overflow-hidden transition-height duration-300 ease-in-out
        :class="[isMini ? 'h-0 pt-0' : 'h-24px pt-4px']"
      >
        {{ label }}
      </p>
    </div>
  </div>
</template>
