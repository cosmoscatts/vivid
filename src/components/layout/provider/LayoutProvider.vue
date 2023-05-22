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
const diffHeight = getLayoutContentHeight()
const fullWrapperWidth = computed(() => {
  if (isMobile.value || uiStore.settings.layout.includes('horizontal')) return '100%'
  if (uiStore.settings.layout === 'vertical-mix') {
    let width = uiStore.collapseSide.state ? params.mixSideCollapsedWidth : params.mixSideWidth
    if (uiStore.mixSideFixed) width += params.mxiSideDrawerWidth
    return `calc(100% - ${width}px)`
  }
  return `calc(100% - ${uiStore.collapseSide.state ? params.sideCollapsedWidth : params.sideWidth}px)`
})
const fullWrapperLeft = computed(() => {
  if (isMobile.value || uiStore.settings.layout.includes('horizontal')) return '0px'
  if (uiStore.settings.layout === 'vertical-mix') {
    let width = uiStore.collapseSide.state ? params.mixSideCollapsedWidth : params.mixSideWidth
    if (uiStore.mixSideFixed) width += params.mxiSideDrawerWidth
    return `${width}px`
  }
  return `${uiStore.collapseSide.state ? params.sideCollapsedWidth : params.sideWidth}px`
})
const contentWrapperMarginLeft = computed(() => {
  if (isMobile.value || uiStore.settings.layout !== 'horizontal-mix') return '0px'
  return [`${params.sideWidth}px`, `${params.sideCollapsedWidth}px`][Number(uiStore.collapseSide.state)]
})
const showPageHeader = computed(() => {
  return uiStore.settings.layout === 'horizontal' && uiStore.settings.showPageHeader
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
        <slot name="header" />
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
          marginLeft: `${contentWrapperMarginLeft}`,
          minHeight: `calc(100% - ${diffHeight}px)`,
          overflow: uiStore.settings.fixNav
            ? 'hidden auto'
            : undefined,
        }"
      >
        <a-layout-content>
          <slot name="main">
            <LayoutMain ha :style="{ padding: `${params.contentPadding}px`, minHeight: `calc(100vh - ${diffHeight + params.footHeight}px)` }">
              <template v-if="showPageHeader" #header>
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
