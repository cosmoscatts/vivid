<script setup lang="ts">
import { LAYOUT_PARAMS as params } from '~/constants'

const show = ref(false)
</script>

<template>
  <button
    icon-btn text-lg i-carbon-menu
    @click="show = !show"
  />

  <a-drawer
    v-model:visible="show"
    :width="params.sideWidth"
    :header="false"
    :footer="false"
    unmount-on-close
  >
    <div flex="center col">
      <LayoutNavDropdown h50px />
      <div flex-center h50px mt10px>
        <LayoutNavGithub mr4 />
        <LayoutNavBell mr4 />
        <LayoutNavFullscreen mr4 />
        <LayoutNavDarkToggle />
      </div>
    </div>
    <LayoutMenu
      mode="vertical"
      no-collapse
      hw-full of-y-auto
      :style="{ height: 'calc(100vh - 130px)' }"
    />
  </a-drawer>
</template>
