<script setup lang="ts">
import { LAYOUT_PARAMS } from '~/constants'
</script>

<template>
  <div flex="x-center col" of-hidden>
    <LayoutLogo />
    <LayoutMenu :style="{ height: `calc(100% - ${LAYOUT_PARAMS.navHeight}px)` }" />
  </div>
</template>
