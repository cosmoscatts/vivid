<script setup lang="ts">
import type { User } from '~/types'
const props = defineProps<{
  type: 'add' | 'edit'
  data?: User
}>()
const { visible } = defineModel<{ visible: boolean }>()
const refForm = ref()
const getBase = () => ({
  id: undefined,
  username: '',
  name: '',
  password: '',
  checkPass: '',
  avatar: undefined,
  roleId: undefined,
})
const {
  formModel,
  loading,
  endLoading,
  assign,
  handleOk,
} = createModalData<User>({
  getBase,
  refForm,
})
watch(visible, (val) => {
  if (val) {
    assign([getBase(), props.data][Number(props.type === 'edit')])
    endLoading()
    refForm.value?.clearValidate()
  }
})
defineExpose({ endLoading })
</script>

<template>
  <a-modal
    :visible="visible"
    :width="600"
    :mask-closable="false"
    :ok-loading="loading"
    :ok-text="type === 'add' ? '添加' : '更新'"
    @ok="handleOk"
    @cancel="visible = false"
  >
    <template #title>
      {{ ['添加用户', '编辑用户'][type === 'add' ? 0 : 1] }}
    </template>
    <a-form ref="refForm" :model="formModel" auto-label-width size="large">
      <a-form-item field="avatar" label="头像" hide-asterisk feedback>
        <AvatarUpload v-model:avatar="formModel.avatar" />
      </a-form-item>
      <a-form-item
        field="username" label="账号" hide-asterisk feedback
        :rules="[
          { required: true, message: '账号是必须的' },
          { minLength: 5, message: '长度必须大于5' },
        ]"
        :validate-trigger="defaultValidateTrigger"
      >
        <a-input
          v-model="formModel.username"
          placeholder="请输入账号..."
          allow-clear
        />
      </a-form-item>
      <a-form-item
        field="name" label="名称" hide-asterisk feedback
        :rules="[
          { required: true, message: '名称是必须的' },
        ]"
        :validate-trigger="defaultValidateTrigger"
      >
        <a-input
          v-model="formModel.name"
          placeholder="请输入名称..."
          allow-clear
        />
      </a-form-item>
      <a-form-item v-if="type === 'add'" field="password" label="密码" hide-asterisk feedback>
        <a-input-password
          v-model="formModel.password"
          placeholder="请输入你的密码..."
          allow-clear
        >
          <template #prefix>
            <IconLock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item v-if="type === 'add'" field="checkPass" label="确认密码" hide-asterisk feedback>
        <a-input-password
          v-model="formModel.checkPass"
          placeholder="请输入你的密码..."
          allow-clear
        >
          <template #prefix>
            <IconLock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="roleId" label="角色" hide-asterisk feedback
        :rules="[
          { required: true, message: '角色是必须的' },
        ]"
        :validate-trigger="defaultValidateTrigger"
      >
        <a-select
          v-model="formModel.roleId"
          :options="SelectOptionsHandler.roleOptions"
          placeholder="请选择角色..."
          allow-clear
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
