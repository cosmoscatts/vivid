<script setup lang="ts">
defineProps<{ content: string }>()
defineOptions({ inheritAttrs: true })
</script>

<template>
  <span whitespace-nowrap of-hidden text-ellipsis>
    <slot>
      {{ content }}
    </slot>
  </span>
</template>
