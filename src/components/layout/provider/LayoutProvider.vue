<script setup lang="ts">
import { SHOW_SETTINGS_BUTTON, LAYOUT_PARAMS as params } from '~/constants'
const uiStore = useUiStore()
const refFullWrapper = ref()
const refContentWrapper = ref()
const backTopTarget = computed(() => {
  return uiStore.settings.fixNav
    ? '#content-wrapper'
    : '#full-wrapper'
})
const diffHeight = computed(() => {
  let height = params.navHeight
  if (uiStore.settings.showTabs) height += params.tabHeight
  return height
})
const fullWrapperWidth = computed(() => {
  return (isMobile.value || uiStore.settings.layout === 'horizontal')
    ? '100%'
    : `calc(100% - ${uiStore.collapseSide.state ? params.sideCollapsedWidth : params.sideWidth}px)`
})
const fullWrapperLeft = computed(() => {
  return (isMobile.value || uiStore.settings.layout === 'horizontal')
    ? '0px'
    : `${uiStore.collapseSide.state ? params.sideCollapsedWidth : params.sideWidth}px`
})
</script>

<template>
  <a-layout relative hw-screen bg-body of-hidden>
    <slot name="side" />

    <a-layout
      id="full-wrapper"
      ref="refFullWrapper"
      absolute h-full of="x-hidden y-auto"
      :style="{
        width: fullWrapperWidth,
        left: fullWrapperLeft,
      }"
    >
      <a-layout-header
        bg-nav
        :class="
          uiStore.settings.fixNav
            ? 'absolute top-0 right-0 w-full'
            : ''"
      >
        <slot name="header">
          <LayoutNav w-full :style="{ height: `${params.navHeight}px` }" />
          <LayoutTabs v-show="uiStore.settings.showTabs" wfull :style="{ height: `${params.tabHeight}px` }" />
        </slot>
      </a-layout-header>
      <a-layout
        id="content-wrapper"
        ref="refContentWrapper"
        :style="{
          marginTop: `${
            !uiStore.settings.fixNav
              ? 0
              : uiStore.settings.showTabs
                ? params.navHeight + params.tabHeight
                : params.navHeight
          }px`,
          minHeight: `calc(100% - ${diffHeight}px)`,
          overflow: uiStore.settings.fixNav
            ? 'hidden auto'
            : undefined,
        }"
      >
        <a-layout-content>
          <slot name="main">
            <LayoutMain ha :style="{ padding: `${params.contentPadding}px`, minHeight: `calc(100vh - ${diffHeight + params.footHeight}px)` }">
              <template v-if="uiStore.settings.layout === 'horizontal'" #header>
                <LayoutPageHeader mb10px />
              </template>
            </LayoutMain>
          </slot>
        </a-layout-content>
        <a-layout-footer
          v-if="uiStore.settings.showFoot"
          :style="{ height: `${params.footHeight}px` }"
        >
          <slot name="foot">
            <LayoutFoot hw-full />
          </slot>
        </a-layout-footer>
      </a-layout>
      <LayoutSettings v-if="SHOW_SETTINGS_BUTTON" />
    </a-layout>
    <LayoutBackTop :target-container="backTopTarget" />
  </a-layout>
</template>
