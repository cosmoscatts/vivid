<script setup lang="ts">
const emit = defineEmits<{
  (event: 'search'): void
}>()
function getBase() {
  return {
    name: '',
    createTime: [],
    updateTime: [],
  }
}
const {
  formModel,
  reset,
  getSearchFormParams,
} = createSearchForm(getBase)
function search() {
  emit('search')
}
defineExpose({ getSearchFormParams })
</script>

<template>
  <CommonSearchForm v-bind="{ formModel, search, reset }">
    <a-col :span="8">
      <a-form-item field="name" label="名称" :hide-label="hideFormLabel">
        <a-input
          v-model="formModel.name"
          placeholder="请输入名称"
          allow-clear
        />
      </a-form-item>
    </a-col>
    <a-col :span="8">
      <a-form-item field="createTime" label="创建时间" :hide-label="hideFormLabel">
        <a-range-picker
          v-model="formModel.createTime"
          w-full
        />
      </a-form-item>
    </a-col>
    <a-col :span="8">
      <a-form-item field="updateTime" label="更新时间" :hide-label="hideFormLabel">
        <a-range-picker
          v-model="formModel.updateTime"
          w-full
        />
      </a-form-item>
    </a-col>
  </CommonSearchForm>
</template>
