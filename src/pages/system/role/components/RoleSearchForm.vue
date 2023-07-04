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
} = useSearchForm(getBase)
function search() {
  emit('search')
}
defineExpose({ getSearchFormParams })
</script>

<template>
  <CommonSearchForm v-bind="{ formModel, search, reset }">
    <a-col :span="8">
      <CommonFormItem field="name" label="名称" :has-rules="false" :hide-label="hideFormLabel">
        <a-input
          v-model="formModel.name"
          placeholder="请输入名称"
          allow-clear
        />
      </CommonFormItem>
    </a-col>
    <a-col :span="8">
      <CommonFormItem field="createTime" label="创建时间" :has-rules="false" :hide-label="hideFormLabel">
        <a-range-picker
          v-model="formModel.createTime"
          w-full
        />
      </CommonFormItem>
    </a-col>
    <a-col :span="8">
      <CommonFormItem field="updateTime" label="更新时间" :has-rules="false" :hide-label="hideFormLabel">
        <a-range-picker
          v-model="formModel.updateTime"
          w-full
        />
      </CommonFormItem>
    </a-col>
  </CommonSearchForm>
</template>
