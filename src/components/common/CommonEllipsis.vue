<script setup lang="ts">
import type { StyleValue } from 'vue'

defineOptions({ inheritAttrs: true })
const { content, width = 100, tooltipPosition = 'lt', style = {} } = defineProps<{
  content: string
  width?: number
  tooltipPosition?: 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br' | 'left' | 'lt' | 'lb' | 'right' | 'rt' | 'rb'
  style?: StyleValue
}>()

const refEl = ref()
const { isOutside } = useMouseInElement(refEl)

const scrollWidth = ref(0)
const offsetWidth = ref(0)

function setWidth() {
  if (!refEl.value) return
  scrollWidth.value = refEl.value.scrollWidth
  offsetWidth.value = refEl.value.offsetWidth
}

watch(() => content, (n, o) => {
  if (n !== o) setWidth()
})

onMounted(setWidth)

const isEllipsis = computed(() => scrollWidth.value > offsetWidth.value)

const visible = computed(() => {
  if (!isEllipsis.value) return false
  return !isOutside.value
})
</script>

<template>
  <a-tooltip :content="content" :popup-visible="visible" :position="tooltipPosition">
    <div ref="refEl" of-hidden text-ellipsis whitespace-nowrap :style="Object.assign(style as {}, { maxWidth: `${width}px` })">
      {{ content }}
    </div>
  </a-tooltip>
</template>
