<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div hw-screen flex-center>
    <a-result status="403" class="mb-1/10">
      <template #title>
        <div text-32px>
          您没有权限
        </div>
      </template>
      <template #extra>
        <a-space>
          <a-button type="primary" @click="router.back()">
            返回
          </a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>
