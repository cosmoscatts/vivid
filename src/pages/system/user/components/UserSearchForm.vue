<script setup lang="ts">
const emit = defineEmits<{
  (event: 'search'): void
}>()
function getBase() {
  return {
    username: '',
    name: '',
    roleId: undefined,
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
      <CommonFormItem field="username" label="账号" :has-rules="false" :hide-label="hideFormLabel">
        <a-input
          v-model="formModel.username"
          placeholder="请输入用户账号"
          allow-clear
        />
      </CommonFormItem>
    </a-col>
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
      <CommonFormItem field="roleId" label="角色" :has-rules="false" :hide-label="hideFormLabel">
        <a-select
          v-model="formModel.roleId"
          :options="O.options('role')"
          placeholder="请选择角色"
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
