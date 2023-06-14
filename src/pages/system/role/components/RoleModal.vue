<script setup lang="ts">
import type { Role } from '~/types'
import { MENUS } from '~/constants'

const props = defineProps<{
  type: 'add' | 'edit'
  data?: Role
}>()
const emit = defineEmits<{
  (event: 'saveData', data: Role): void
}>()
const { visible } = defineModels<{ visible: boolean }>()
const refForm = ref()
function getBase() {
  return {
    id: undefined,
    name: '',
    description: '',
    menuIdList: [],
  }
}
const {
  formModel,
  loading,
  endLoading,
  assign,
  ok,
} = createModalData<Role>({
  getBase,
  refForm,
})
const treeData = generateTreeMenuData(MENUS)
watch(visible, (val) => {
  if (val) {
    assign([getBase(), props.data][Number(props.type === 'edit')])
    endLoading()
    refForm.value?.clearValidate()
  }
})
function handleOk() {
  ok(() => {
    emit('saveData', clone(formModel))
  })
}
const allCheckedKeys = $computed<number[]>(() => {
  return flattenMenu(MENUS).map(item => item.id)
})
const isAllChecked = $computed(() => {
  return [
    formModel.menuIdList?.length,
    formModel.menuIdList?.length === allCheckedKeys.length,
  ].filter(Boolean).length === 2
})
function toggleChecked() {
  formModel.menuIdList = [allCheckedKeys, []][Number(isAllChecked)]
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
    @cancel="$emit('update:visible', false)"
  >
    <template #title>
      {{ ['添加角色', '编辑角色'][Number(type === 'edit')] }}
    </template>
    <a-form ref="refForm" :model="formModel" auto-label-width size="large">
      <CommonFormItem field="name" label="角色名称">
        <a-input
          v-model="formModel.name"
          placeholder="请输入角色名称..."
          allow-clear
        />
      </CommonFormItem>
      <CommonFormItem field="description" label="角色描述">
        <a-input
          v-model="formModel.description"
          placeholder="请输入角色描述..."
          allow-clear
        />
      </CommonFormItem>
      <CommonFormItem field="menuIdList" label="角色权限">
        <div flex="~ col" wfull max-h-350px of-y-auto>
          <a-button
            type="text" font-bold w100px
            @click="toggleChecked"
          >
            {{ ['全选', '取消全选'][Number(isAllChecked)] }}
          </a-button>
          <a-tree
            v-if="treeData?.length > 0"
            v-model:checked-keys="formModel.menuIdList"
            min-h-200px
            :checkable="true"
            :show-line="true"
            :data="treeData"
          />
        </div>
      </CommonFormItem>
    </a-form>
  </a-modal>
</template>
