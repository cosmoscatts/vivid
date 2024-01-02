<script setup lang="ts">
const props = defineProps<{
  formModel: any
  hideButtons?: boolean
  hideLabel?: boolean
  search?: () => void
  reset?: () => void
}>()

const hasButtons = computed(() => {
  if (props.hideButtons === true) return false
  return true
})
const hasLabel = computed(() => {
  if (props.hideLabel === true) return false
  return true
})
const rows = computed(() => (Math.ceil(Object.keys(props.formModel).length / 3)))
const dividerHeight = computed(() => (`${34 + (rows.value - 1) * 50}px`))
const buttonGroupFlex = computed(() => (['86px', '172px'][Number(rows.value === 1)]))
const direction = computed(() => {
  return ['vertical', 'horizontal'][Number(rows.value === 1)] as 'vertical' | 'horizontal'
})
const labelColProps = computed(() => {
  const span = [0, 6][Number(hasLabel.value)]
  return { span }
})
const wrapperColProps = computed(() => {
  const span = [24, 18][Number(hasLabel.value)]
  return { span }
})
</script>

<template>
  <a-row>
    <a-col :flex="1">
      <a-form
        :model="formModel"
        :label-col-props="labelColProps"
        :wrapper-col-props="wrapperColProps"
        label-align="left"
      >
        <a-row :gutter="16">
          <slot />
        </a-row>
      </a-form>
    </a-col>
    <a-divider v-if="hasButtons" :style="{ height: dividerHeight }" direction="vertical" />
    <a-col v-if="hasButtons" :flex="buttonGroupFlex">
      <a-space :direction="direction" :size="18">
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
