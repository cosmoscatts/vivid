<script setup lang="ts">
defineOptions({ inheritAttrs: true })
defineProps<{ content: string }>()
</script>

<template>
  <span of-hidden text-ellipsis whitespace-nowrap>
    <slot>
      {{ content }}
    </slot>
  </span>
</template>
