<script setup lang="ts">
import UserPanel from './components/UserPanel.vue'
import BasicInformation from './components/BasicInformation.vue'
import SecuritySettings from './components/SecuritySettings.vue'

let activeTabIdx = $ref(1)
const changeTabIdx = (key: string | number) => activeTabIdx = Number(key)
</script>

<template>
  <div>
    <a-row mb16px>
      <a-col :span="24">
        <UserPanel />
      </a-col>
    </a-row>

    <a-row min-h-250px bg="[var(--color-bg-2)]" rounded-sm p="t20px r0 b0 l20px">
      <a-col :span="24">
        <a-tabs :active-key="activeTabIdx" type="rounded" @change="changeTabIdx">
          <a-tab-pane :key="1">
            <template #title>
              <IconInfoCircle /> 基础信息
            </template>
            <BasicInformation :tab-idx="activeTabIdx" />
          </a-tab-pane>
          <a-tab-pane :key="2">
            <template #title>
              <IconLock /> 安全设置
            </template>
            <SecuritySettings :tab-idx="activeTabIdx" />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>
