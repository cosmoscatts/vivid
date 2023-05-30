<script setup lang="ts">
import RoleSearchForm from './components/RoleSearchForm.vue'
import RoleModal from './components/RoleModal.vue'
import { columns } from './columns'
import type { Role } from '~/types'

const refSearchForm = ref()
const refModal = ref()

const {
  pagination,
  showPagination,
  formatRowIndex,
  onPageChange,
} = createPagination(fetchTableData)
const {
  modalType,
  modalVisible,
  selectedItem,
  showModal,
} = useControlModal()

const { Loading } = useLoading()

let tabledata = $ref<Role[]>([])
function fetchTableData() {
  Loading.start()
  RoleApi.fetchPageList()
    .then(({ data: { records = [], total = 0 } }) => {
      tabledata = records
      pagination.total = total
    })
    .finally(() => useTimeoutFn(Loading.end, 1000))
}
fetchTableData()

function saveData() {

}

function deleteData(data: Role) {

}

/**
 * 判断当前角色权限是否改变
 */
// function checkCurrentRolePermissionChanged(currentMenuIdList: number[]) {
//   const oldMenuIdList = getFlattenMenuTree().map(item => item.id)
//   if (currentMenuIdList.length !== oldMenuIdList.length) return true
//   const [oldStr, currentStr] = [oldMenuIdList, currentMenuIdList].map(item => item.sort().join(''))
//   return oldStr !== currentStr
// }
</script>

<template>
  <div>
    <a-card title="查询角色">
      <template #extra>
        <a-button type="text" size="small" font-bold @click="showModal({})">
          <template #icon>
            <IconPlus />
          </template>
          添加
        </a-button>
      </template>
      <RoleSearchForm
        ref="refSearchForm" class="slide-enter" :style="{
          '--enter-stage': 0,
          '--enter-step': '60ms',
        }" @search="fetchTableData"
      />
      <a-table
        class="slide-enter" :style="{
          '--enter-stage': 2,
          '--enter-step': '60ms',
        }"
        row-key="id"
        :loading="Loading.state"
        :columns="columns"
        :data="tabledata"
        :bordered="false"
        :pagination="showPagination"
        @page-change="onPageChange"
      >
        <template #id="{ rowIndex }">
          {{ formatRowIndex(rowIndex) }}
        </template>
        <template #name="{ record }">
          <span text-primary font-bold>{{ record.name ?? '无' }}</span>
        </template>
        <template #createTime="{ record }">
          {{ formatDate(record.createTime, { defaultReturn: '-' }) }}
        </template>
        <template #updateTime="{ record }">
          {{ formatDate(record.updateTime, { defaultReturn: '-' }) }}
        </template>
        <template #action="{ record }">
          <a-button type="text" size="small" font-bold @click="showModal({ type: 'edit', data: record })">
            编辑
          </a-button>
          <a-button type="text" size="small" font-bold @click="deleteData(record)">
            删除
          </a-button>
        </template>
      </a-table>
    </a-card>
    <RoleModal
      ref="refModal"
      v-model:visible="modalVisible"
      v-bind="{ type: modalType, data: selectedItem }"
      @save-data="saveData"
    />
  </div>
</template>
