<script setup lang="ts">
import { IconPlus } from '@arco-design/web-vue/es/icon'
import UserModal from './components/UserModal.vue'
import UserSearchForm from './components/UserSearchForm.vue'
import { columns } from './columns'
import type { User } from '~/types'

const refSearchForm = ref()
const refModal = ref()

const { pagination, formatRowIndex } = createPagination()
const {
  modalType,
  modalVisible,
  selectedItem,
  showModal,
} = useControlModal()

const { loading, startLoading, endLoading } = useLoading()

let tabledata = $ref<User[]>([])
function fetchTableData() {
  startLoading()
  UserApi.fetchPageList()
    .then(({ data: { records = [], total = 0 } }) => {
      tabledata = records
      pagination.total = total
    })
    .finally(() => useTimeoutFn(endLoading, 1000))
}

function onPageChange(current: number) {
  pagination.current = current
  fetchTableData()
}

function saveData() {

}

function deleteData(data: User) {

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
      <UserSearchForm ref="refSearchForm" />
      <a-table
        row-key="id"
        :loading="loading"
        :columns="columns"
        :pagination="pagination.total! > pagination.pageSize ? pagination : false"
        :data="tabledata"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #id="{ rowIndex }">
          {{ formatRowIndex(rowIndex) }}
        </template>
        <template #roleId="{ record }">
          <a-tag color="#7bc616">
            {{ record?.role?.name || '无' }}
          </a-tag>
        </template>
        <template #createTime="{ record }">
          {{ formatDate(record.createTime) }}
        </template>
        <template #updateTime="{ record }">
          {{ formatDate(record.updateTime) }}
        </template>
        <template #action="{ record }">
          <a-button type="text" font-bold size="small" @click="showModal({ type: modalType, data: selectedItem })">
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
