<script setup lang="ts">
import type { Role } from '~/types'
import { columns } from './columns'
import RoleModal from './components/RoleModal.vue'
import RoleSearchForm from './components/RoleSearchForm.vue'

const refSearchForm = ref()
const refModal = ref()

const {
  pagination,
  showPagination,
  formatRowIndex,
  onPageChange,
} = usePagination(fetchTableData)
const {
  modalType,
  modalVisible,
  selectedItem,
  showModal,
} = useControlModal()

const { Loading } = useLoading()

const tabledata = ref<Role[]>([])
function fetchTableData() {
  Loading.start()
  RoleApi.fetchPageList()
    .then(({ data: { records = [], total = 0 } }) => {
      tabledata.value = records
      pagination.total = total
    })
    .finally(() => useTimeoutFn(Loading.end, 1000))
}
fetchTableData()

function saveData() {

}

function deleteData(_data: Role) {

}

/**
 * 判断当前角色权限是否改变
 */
// function checkCurrentRolePermissionChanged(currentMenuIdList: number[]) {
//   const oldMenuIdList = getUserFlattenMenuTree().map(item => item.id)
//   if (currentMenuIdList.length !== oldMenuIdList.length) return true
//   const [oldStr, currentStr] = [oldMenuIdList, currentMenuIdList].map(item => item.sort().join(''))
//   return oldStr !== currentStr
// }
</script>

<template>
  <div>
    <a-card title="查询角色">
      <template #extra>
        <CommonBtnAdd @click="showModal({})" />
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
          <span tag-primary>
            {{ record.name ?? '无' }}
          </span>
        </template>
        <template #action="{ record }">
          <div flex-center gap-2>
            <div flex-center gap-2>
              <CommonBtnEdit @click="showModal({ type: 'edit', data: record })" />
              <CommonBtnDel @click="deleteData(record)" />
            </div>
          </div>
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
