<script setup lang="ts">
import type { User } from '~/types'
import { columns } from './columns'
import UserModal from './components/UserModal.vue'
import UserSearchForm from './components/UserSearchForm.vue'

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

const tabledata = ref<User[]>([])
function fetchTableData() {
  Loading.start()
  UserApi.fetchPageList()
    .then(({ data: { records = [], total = 0 } }) => {
      tabledata.value = records
      pagination.total = total
    })
    .finally(() => useTimeoutFn(Loading.end, 1000))
}
fetchTableData()

function saveData() {

}

function deleteData(_data: User) {

}
</script>

<template>
  <div>
    <a-card title="查询用户">
      <template #extra>
        <CommonBtnAdd @click="showModal({})" />
      </template>
      <UserSearchForm
        ref="refSearchForm" class="slide-enter" :style="{
          '--enter-stage': 0,
          '--enter-step': '60ms',
        }"
        @search="fetchTableData"
      />
      <a-table
        class="slide-enter" :style="{
          '--enter-stage': 2,
          '--enter-step': '60ms',
        }"
        row-key="id"
        :loading="Loading.state"
        :columns="columns"
        :pagination="showPagination"
        :data="tabledata"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #id="{ rowIndex }">
          {{ formatRowIndex(rowIndex) }}
        </template>
        <template #roleId="{ record }">
          <span tag-primary>
            {{ O.label('role', record.roleId) }}
          </span>
        </template>
        <template #createTime="{ record }">
          {{ formatDate(record.createTime, { defaultReturn: '-' }) }}
        </template>
        <template #updateTime="{ record }">
          {{ formatDate(record.updateTime, { defaultReturn: '-' }) }}
        </template>
        <template #action="{ record }">
          <div flex-center gap-2>
            <CommonBtnEdit @click="showModal({ type: 'edit', data: record })" />
            <CommonBtnDel @click="deleteData(record)" />
          </div>
        </template>
      </a-table>
    </a-card>
    <UserModal
      ref="refModal"
      v-model:visible="modalVisible"
      v-bind="{ type: modalType, data: selectedItem }"
      @save-data="saveData"
    />
  </div>
</template>
