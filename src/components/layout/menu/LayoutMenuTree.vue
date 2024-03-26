<script setup lang="ts">
import type { Menu } from '~/types'

const { menus = [], mode, first = false } = defineProps<{
  first: boolean
  menus?: Menu[]
  mode: 'vertical' | 'horizontal'
}>()
</script>

<template>
  <div :class="['', 'flex'][Number(mode === 'horizontal' && first)]">
    <div v-for="{ id, title, path, icon, children } of menus" :key="id">
      <a-sub-menu v-if="children?.length" :key="String(id)" :title="title">
        <template v-if="hasMenuIcon(icon)" #icon>
          <Component :is="formatMenuIcon(icon!)" />
        </template>
        <LayoutMenuTree :menus="children" :mode="mode" :first="false" />
      </a-sub-menu>
      <RouterLink v-else :key="path" :to="path!">
        <a-menu-item :key="String(id)">
          <template v-if="hasMenuIcon(icon)" #icon>
            <Component :is="formatMenuIcon(icon!)" />
          </template>
          {{ title }}
        </a-menu-item>
      </RouterLink>
    </div>
  </div>
</template>
