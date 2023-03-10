<script setup lang="ts">
</script>

<template>
  <a-layout relative hw-screen bg-body of-hidden>
    <slot name="side" />

    <a-layout
      id="full-wrapper"
      ref="refFullWrapper"
      absolute h-full of="x-hidden y-auto"
      :style="{
        width: mainWrapperWidth,
        left: mainWrapperLeft,
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
          <TheNav w-full :style="{ height: `${navHeight}px` }" />
          <TheTabs v-show="uiStore.settings.showTabs" wfull :style="{ height: `${tabHeight}px` }" />
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
                ? navHeight + tabHeight + 1
                : navHeight + 1
          }px`,
          minHeight: `calc(100% - ${diffHeight}px)`,
          overflow: uiStore.settings.fixNav
            ? 'hidden auto'
            : undefined,
        }"
      >
        <a-layout-content>
          <slot name="main">
            <TheMain ha :style="{ padding: `${contentPadding}px`, minHeight: `calc(100vh - ${diffHeight + footHeight + 1}px)` }" />
          </slot>
        </a-layout-content>
        <a-layout-footer
          v-if="uiStore.settings.showFoot"
          :style="{ height: `${footHeight}px` }"
        >
          <slot name="foot">
            <LayoutFoot hw-full />
          </slot>
        </a-layout-footer>
      </a-layout>
      <TheSettings v-if="uiStore.settings.showAppSettings" />
    </a-layout>
    <BackTop :target-container="backTopTarget" />
  </a-layout>
</template>
