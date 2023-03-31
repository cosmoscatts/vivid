<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()
const avatar = computed(() => authStore.user?.avatar)

function logout() {
  ANotification.success({
    title: '登出成功',
    content: '记得回来~',
    duration: 1000,
  })
  router.push('/login')
  authStore.logout()
}

function onSelect<T extends string | number | Record<string, any> | undefined>(value: T) {
  if (!isString(value)) return
  ;[
    () => router.push('/profile'),
    logout,
  ][Number(value)]()
}
</script>

<template>
  <a-dropdown trigger="hover" position="bottom" @select="onSelect">
    <div flex-y-center cursor-pointer>
      <a-avatar :size="32" shape="square">
        <img alt="头像" :src="avatar">
      </a-avatar>
      <CommonEllipsis :content="authStore.user?.name ?? ''" :class="['max-w-130px', 'max-w-80px'][Number(isPC)]" ml3 />
    </div>
    <template #content>
      <a-doption value="0">
        <template #icon>
          <div i-carbon-user-profile />
        </template>
        个人资料
      </a-doption>
      <a-doption value="1">
        <template #icon>
          <div i-ri-logout-box-r-line />
        </template>
        退出登录
      </a-doption>
    </template>
  </a-dropdown>
</template>
