<script setup lang="ts">
import { IconPlus } from '@arco-design/web-vue/es/icon'
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
        <a-button type="text" size="small" font-bold @click="showModal({})">
          <template #icon>
            <IconPlus />
          </template>
          添加
        </a-button>
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
          <a-tag color="#7bc616">
            {{ O.label('role', record.roleId) }}
          </a-tag>
        </template>
        <template #createTime="{ record }">
          {{ formatDate(record.createTime, { defaultReturn: '-' }) }}
        </template>
        <template #updateTime="{ record }">
          {{ formatDate(record.updateTime, { defaultReturn: '-' }) }}
        </template>
        <template #action="{ record }">
          <a-button type="text" font-bold size="small" @click="showModal({ type: 'edit', data: record })">
            编辑
          </a-button>
          <a-button type="text" font-bold size="small" @click="deleteData(record)">
            删除
          </a-button>
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
