<script setup lang="ts">
defineOptions({ inheritAttrs: true })
defineProps<{ content: string }>()

const refEl = ref()
const { isOutside } = useMouseInElement(refEl)

const isEllipsis = $computed(() => {
  if (!refEl.value) return false
  return refEl.value.scrollWidth > refEl.value.offsetWidth
})

const visible = computed(() => {
  if (!isEllipsis) return false
  return !isOutside.value
})
</script>

<template>
  <a-tooltip :content="content" :popup-visible="visible">
    <span ref="refEl" of-hidden text-ellipsis whitespace-nowrap>
      {{ content }}
    </span>
  </a-tooltip>
</template>
