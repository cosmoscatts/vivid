<script setup lang="ts">
import type { ValidatedError } from '@arco-design/web-vue/es/form/interface'
import { Motion, getToRouteAfterLogin } from '~/utils'

const router = useRouter()
const authStore = useAuthStore()
const { loading, startLoading, endLoading } = useLoading()

interface ModelType {
  username?: string
  password?: string
}

const baseFormModel = [
  {
    username: '',
    password: '',
  },
  {
    username: 'admin',
    password: '123456',
  },
][Number(isDevelopment())]

const formModel = reactive<ModelType>({ ...baseFormModel })

function submit({
  errors,
  values,
}: {
  errors: Record<string, ValidatedError> | undefined
  values: ModelType
}) {
  if (errors) return
  startLoading()
  const data = {
    id: 1,
    username: 'admin',
    name: getRandomName(),
    roleId: 1,
    createTime: new Date(),
  }
  authStore.login(data)
    .then(() => {
      useTimeoutFn(() => {
        const path = getToRouteAfterLogin()
        if (!path) {
          Message.error('请联系管理员配置菜单')
          return
        }
        router.push(path)
        ANotification.success({
          title: '登录成功',
          content: `你好，${values.username}。欢迎回来！`,
        })
      }, 1000)
    }).finally(() => useTimeoutFn(endLoading, 1000))
}
</script>

<template>
  <a-form :model="formModel" layout="vertical" size="large" @submit="submit">
    <Motion :delay="100">
      <CommonFormItem
        field="username" label="账号" :rules="[
          { required: true, message: '账号是必须的' },
          { minLength: 5, message: '长度必须大于5' },
        ]"
      >
        <a-input v-model="formModel.username" placeholder="请输入你的账号..." allow-clear>
          <template #prefix>
            <IconUser />
          </template>
        </a-input>
      </CommonFormItem>
    </Motion>
    <Motion :delay="150">
      <CommonFormItem
        field="password" label="密码" :rules="[
          { required: true, message: '密码是必须的' },
          { minLength: 6, message: '长度必须大于6' },
        ]"
      >
        <a-input-password v-model="formModel.password" placeholder="请输入你的密码..." allow-clear>
          <template #prefix>
            <IconLock />
          </template>
        </a-input-password>
      </CommonFormItem>
    </Motion>
    <Motion :delay="200">
      <a-form-item>
        <a-button long type="primary" html-type="submit" :loading="loading" font-bold>
          登录
        </a-button>
      </a-form-item>
    </Motion>
  </a-form>
</template>
