<script setup lang="ts">
const props = defineProps<{ tabIdx?: number }>()
const refForm = ref()
const authStore = useAuthStore()
function getBase() {
  return {
    id: authStore.user!.id,
    password: '',
    newPass: '',
    checkPass: '',
  }
}
const {
  formModel,
  ok,
  reset,
} = useFormModel({
  getBase,
  refForm,
})

const router = useRouter()
function onSubmit() {
  ok(() => {
    Message.success('密码修改成功, 请重新登录')
    useTimeoutFn(() => {
      router.push('/login')
      authStore.logout()
    }, 500)
  })
}
function validatePassword() {
  return {
    validator: (_value: any | undefined, callback: (error?: string) => void) => {
      const { newPass, checkPass } = formModel
      if ([newPass, checkPass].includes('')) callback()
      else {
        if (newPass !== checkPass) callback('两次密码输入不一致')
        else callback()
      }
    },
  }
}

watch(() => props.tabIdx, reset)
</script>

<template>
  <a-form ref="refForm" :model="formModel" size="large" class="mxa lg:!w540px md:!w440px sm:!w350px xs:!w260px">
    <CommonFormItem field="password" label="旧密码" :hide-label="hideFormLabel">
      <a-input-password
        v-model="formModel.password"
        placeholder="请输入你的旧密码..."
        allow-clear
      />
    </CommonFormItem>
    <CommonFormItem field="newPass" label="新密码" :hide-label="hideFormLabel">
      <a-input-password
        v-model="formModel.newPass"
        placeholder="请输入你的新密码..."
        allow-clear
      />
    </CommonFormItem>
    <CommonFormItem
      field="checkPass" label="确认新密码"
      :rules="[
        { required: true, message: '确认新密码是必须的' },
        validatePassword(),
      ]"
      :hide-label="hideFormLabel"
    >
      <a-input-password
        v-model="formModel.checkPass"
        placeholder="请输入确认新密码..."
        allow-clear
      />
    </CommonFormItem>
    <div m="xa y20px">
      <a-button mr-3 font-bold type="primary" @click="onSubmit">
        更新密码
      </a-button>
      <a-button font-bold @click="reset">
        重置
      </a-button>
    </div>
  </a-form>
</template>
