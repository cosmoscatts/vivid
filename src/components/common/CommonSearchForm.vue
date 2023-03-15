<script setup lang="ts">
const props = defineProps<{
  formModel: any
  search?: () => void
  reset?: () => void
}>()
const rows = $computed(() => (Object.keys(props.formModel).length / 3 + 1))
const dividerHeight = computed(() => (`${34 + (rows - 1) * 50}px`))
const buttonGroupFlex = computed(() => (['86px', '172px'][Number(rows === 1)]))
</script>

<template>
  <a-row>
    <a-col :flex="1">
      <a-form
        :model="formModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
        label-align="left"
      >
        <a-row :gutter="16">
          <slot />
        </a-row>
      </a-form>
    </a-col>
    <a-divider :style="{ height: dividerHeight }" direction="vertical" />
    <a-col :flex="buttonGroupFlex">
      <a-space direction="vertical" :size="18">
        <slot name="buttons">
          <a-button type="primary" font-bold @click="search">
            <template #icon>
              <IconSearch />
            </template>
            搜索
          </a-button>
          <a-button font-bold @click="reset">
            <template #icon>
              <IconRefresh />
            </template>
            重置
          </a-button>
        </slot>
      </a-space>
    </a-col>
  </a-row>
</template>
