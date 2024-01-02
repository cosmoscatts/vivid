<script setup lang="ts">
import ProfileUserPanel from './components/ProfileUserPanel.vue'
import ProfileBasicInformation from './components/ProfileBasicInformation.vue'
import ProfileSecuritySettings from './components/ProfileSecuritySettings.vue'

const activeTabIdx = ref(1)
const changeTabIdx = (key: string | number) => activeTabIdx.value = Number(key)
</script>

<template>
  <div>
    <a-row mb16px>
      <a-col :span="24">
        <ProfileUserPanel />
      </a-col>
    </a-row>

    <a-row bg="[var(--color-bg-2)]" p="t20px r0 b0 l20px" min-h-350px border border-base rounded-sm>
      <a-col :span="24">
        <a-tabs :active-key="activeTabIdx" type="rounded" @change="changeTabIdx">
          <a-tab-pane :key="1">
            <template #title>
              <IconInfoCircle /> 基础信息
            </template>
            <ProfileBasicInformation :tab-idx="activeTabIdx" />
          </a-tab-pane>
          <a-tab-pane :key="2">
            <template #title>
              <IconLock /> 安全设置
            </template>
            <ProfileSecuritySettings :tab-idx="activeTabIdx" />
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>
