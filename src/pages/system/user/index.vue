<script setup lang="ts">
import UserModal from './components/UserModal.vue'
import UserSearchForm from './components/UserSearchForm.vue'
import { columns } from './columns'
import type { User } from '~/types'

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

let tabledata = $ref<User[]>([])
function fetchTableData() {
  Loading.start()
  UserApi.fetchPageList()
    .then(({ data: { records = [], total = 0 } }) => {
      tabledata = records
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
        <a class="group flex-center btn-primary" @click="showModal({})">
          <div
            group-hover="i-carbon-add-filled?mask text-primary"
            i-carbon-add-alt mr2 transition-all duration-200 ease-out
          />
          添加
        </a>
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
            <a class="group flex-center select-none btn-yellow" @click="showModal({ type: 'edit', data: record })">
              <div
                group-hover="i-ri-edit-box-fill?mask text-yellow"
                i-ri-edit-box-line mr2 transition-all duration-200 ease-out
              />
              编辑
            </a>
            <a class="group flex-center select-none btn-red" @click="deleteData(record)">
              <div
                group-hover="i-ri-delete-bin-6-fill?mask text-red"
                i-ri-delete-bin-6-line mr2 transition-all duration-200 ease-out
              />
              删除
            </a>
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
