<script setup lang="ts">
defineProps<{ content: string }>()
defineOptions({ inheritAttrs: true })
</script>

<template>
  <span of-hidden text-ellipsis whitespace-nowrap>
    <slot>
      {{ content }}
    </slot>
  </span>
</template>
