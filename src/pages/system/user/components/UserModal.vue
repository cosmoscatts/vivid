<script setup lang="ts">
import type { User } from '~/types'

const props = defineProps<{
  type: 'add' | 'edit'
  data?: User
}>()
const emit = defineEmits<{
  (event: 'saveData', data: User): void
}>()
const { visible } = defineModels<{ visible: boolean }>()
const refForm = ref()
function getBase() {
  return {
    id: undefined,
    username: '',
    name: '',
    password: '',
    checkPass: '',
    avatar: undefined,
    roleId: undefined,
  }
}
const {
  formModel,
  loading,
  endLoading,
  assign,
  ok,
} = useFormModel<User>({
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
function handleOk() {
  ok(() => {
    if (props.type === 'edit') formModel.password = undefined
    emit('saveData', clone(formModel))
  })
}
defineExpose({ endLoading })
</script>

<template>
  <a-modal
    :visible="visible"
    :width="600"
    :mask-closable="false"
    :ok-loading="loading"
    :ok-text="['添加', '更新'][Number(type === 'edit')]"
    @ok="handleOk"
    @cancel="visible = false"
  >
    <template #title>
      {{ ['添加用户', '编辑用户'][type === 'add' ? 0 : 1] }}
    </template>
    <a-form ref="refForm" :model="formModel" auto-label-width size="large">
      <CommonFormItem
        field="username" label="账号" :rules="[
          { required: true, message: '账号是必须的' },
          { minLength: 5, message: '长度必须大于5' },
        ]"
      >
        <a-input
          v-model="formModel.username"
          placeholder="请输入账号..."
          allow-clear
        />
      </CommonFormItem>
      <CommonFormItem field="name" label="名称">
        <a-input
          v-model="formModel.name"
          placeholder="请输入名称..."
          allow-clear
        />
      </CommonFormItem>
      <CommonFormItem v-if="type === 'add'" field="password" label="密码">
        <a-input-password
          v-model="formModel.password"
          placeholder="请输入你的密码..."
          allow-clear
        >
          <template #prefix>
            <IconLock />
          </template>
        </a-input-password>
      </CommonFormItem>
      <CommonFormItem v-if="type === 'add'" field="checkPass" label="确认密码">
        <a-input-password
          v-model="formModel.checkPass"
          placeholder="请输入你的密码..."
          allow-clear
        >
          <template #prefix>
            <IconLock />
          </template>
        </a-input-password>
      </CommonFormItem>
      <CommonFormItem field="roleId" label="角色">
        <a-select
          v-model="formModel.roleId"
          :options="O.options('role')"
          placeholder="请选择角色..."
          allow-clear
        />
      </CommonFormItem>
    </a-form>
  </a-modal>
</template>
