<script setup lang="ts">
import type { User } from '~/types'
const props = defineProps<{ tabIdx?: number }>()
const refForm = ref()
const authStore = useAuthStore()
const getBase = () => ({
  id: authStore.user!.id,
  name: authStore.user!.name,
})
const {
  formModel,
  ok,
  reset,
} = createModalData<User>({
  getBase,
  refForm,
})

function onSubmit() {
  ok(() => {
    Message.success('信息更新成功')
    authStore.updateUser({
      ...authStore.user!,
      name: formModel.name,
    })
  })
}
watch(() => props.tabIdx, reset)
</script>

<template>
  <a-form ref="refForm" :model="formModel" size="large" class="lg:!w540px md:!w440px sm:!w350px xs:!w260px mxa">
    <CommonFormItem field="name" label="名称">
      <a-input v-model="formModel.name" placeholder="请输入名称..." allow-clear />
    </CommonFormItem>
    <div m="xa y-20px">
      <a-button mr-3 font-bold type="primary" @click="onSubmit">
        更新信息
      </a-button>
      <a-button font-bold @click="reset">
        重置
      </a-button>
    </div>
  </a-form>
</template>
