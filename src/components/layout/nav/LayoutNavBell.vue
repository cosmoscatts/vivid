<script setup lang="ts">
import { IconCalendar, IconMessage, IconNotification } from '@arco-design/web-vue/es/icon'
import type { BellData, BellDataType, BellTabData } from './interfaces'

const activeKey = ref(0)
const tabList: BellTabData[] = [
  { name: '通知', color: '#FFB400', type: 'notification' },
  { name: '消息', color: '#F53F3F', type: 'message' },
  { name: '待办', color: '#165DFF', type: 'todo' },
]

const notificationData = ref<BellData[]>([])
const messageData = ref<BellData[]>([])
const todoData = ref<BellData[]>([])

function queryData() {
  notificationData.value = [
    { title: '你收到了5条新消息', date: new Date() },
    { title: '你收到了10条新消息', date: new Date() },
    { title: '你收到了8条新消息', date: new Date() },
    { title: '你收到了5条新消息', date: new Date() },
    { title: '你收到了5条新消息', date: new Date() },
    { title: '你收到了5条新消息', date: new Date() },
  ]
  messageData.value = [{ title: '正在写页面...', date: new Date() }]
  todoData.value = [
    { title: '缓存主题配置', date: new Date() },
    { title: '自适应页面', date: new Date() },
  ]
}
queryData()

const getDataByKey = (key: number) => [notificationData.value, messageData.value, todoData.value][key]
const totalCnt = computed(() => {
  let cnt = 0
  if (notificationData.value?.length > 0)
    cnt += notificationData.value.length
  if (messageData.value?.length > 0)
    cnt += messageData.value.length
  if (todoData.value?.length > 0)
    cnt += todoData.value.length
  return cnt
})

function formatIcon(key: BellDataType) {
  return {
    notification: IconNotification,
    message: IconMessage,
    todo: IconCalendar,
  }[key]
}
</script>

<template>
  <div mt-2px flex-y-center>
    <a-popover trigger="click" position="br" :content-style="{ paddingBottom: 0 }">
      <a-badge :count="totalCnt" dot>
        <button i-carbon-notification text-lg icon-btn />
      </a-badge>
      <template #content>
        <a-tabs v-model:active-key="activeKey" w-420px flex="~ col" items-center type="rounded">
          <a-tab-pane v-for="{ name, type, color }, idx in tabList" :key="idx">
            <template #title>
              <div w100px flex-center>
                <Component :is="formatIcon(type)" :size="18" mr2 />
                {{ name }}
                <a-badge
                  :count="getDataByKey(idx).length || 0" :max-count="99" ml2
                  :dot-style="{
                    background: color,
                    boxShadow: `0 0 0 2px ${color}`,
                  }"
                />
              </div>
            </template>
            <LayoutNavBellMessage :type="type" :data="getDataByKey(idx)" />
          </a-tab-pane>
        </a-tabs>
        <div flex cursor-pointer>
          <div flex-1 py10px text-center>
            <a-button>全部已读</a-button>
          </div>
          <div flex-1 py10px text-center>
            <a-button>查看更多</a-button>
          </div>
        </div>
      </template>
    </a-popover>
  </div>
</template>
