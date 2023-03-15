<script setup lang="ts">
const getBase = () => ({
  username: '',
  name: '',
  roleId: undefined,
  createTime: [],
  updateTime: [],
})
const {
  formModel,
  search,
  reset,
  getSearchFormParams,
} = createSearchForm(getBase, [])
defineExpose({ getSearchFormParams })
</script>

<template>
  <CommonSearchForm v-bind="{ formModel, search, reset }">
    <a-col :span="8">
      <a-form-item field="username" label="账号" :hide-label="hideFormLabel">
        <a-input
          v-model="formModel.username"
          placeholder="请输入用户账号"
          allow-clear
        />
      </a-form-item>
    </a-col>
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
      <a-form-item field="roleId" label="角色" :hide-label="hideFormLabel">
        <a-select
          v-model="formModel.roleId"
          :options="SelectOptionsHandler.roleOptions"
          placeholder="请选择角色"
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
