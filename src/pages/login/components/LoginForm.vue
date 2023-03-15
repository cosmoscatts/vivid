<script setup lang="ts">
import type { ValidatedError } from '@arco-design/web-vue/es/form/interface'
import { APP_META } from '~/constants'
import { isDevelopment } from '~/config'
import { getRoutesInPermission } from '~/utils'

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
  authStore
    .login(data)
    .then(() => {
      useTimeoutFn(() => {
        const routes = getRoutesInPermission()
        if (!routes.length) {
          Message.error('请联系管理员配置菜单')
        } else {
          router.push(routes[0])
        }
        ANotification.success({
          title: '登录成功',
          content: `你好，${values.username}。欢迎回来！`,
        })
      }, 1000)
    })
    .finally(() => useTimeoutFn(endLoading, 1000))
}

onMounted(() => useTimeoutFn(() => useLottie({
  containerId: '#lottie',
  path: 'https://assets2.lottiefiles.com/packages/lf20_iVPQC8jyX2.json',
}), 50))
</script>

<template>
  <a-card direction="vertical" w450px h580px p20px rounded-8px>
    <div text="32px center" font-bold>
      {{ APP_META.name }}
    </div>
    <div id="lottie" h150px />
    <a-form :model="formModel" layout="vertical" size="large" @submit="submit">
      <a-form-item
        field="username" label="账号" hide-asterisk feedback
        :rules="[
          { required: true, message: '账号是必须的' },
          { minLength: 5, message: '长度必须大于5' },
        ]"
        :validate-trigger="defaultValidateTrigger"
      >
        <a-input v-model="formModel.username" placeholder="请输入你的账号..." allow-clear>
          <template #prefix>
            <IconUser />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password" label="密码" hide-asterisk feedback
        :rules="[
          { required: true, message: '密码是必须的' },
          { minLength: 6, message: '长度必须大于6' },
        ]"
        :validate-trigger="defaultValidateTrigger"
      >
        <a-input-password v-model="formModel.password" placeholder="请输入你的密码..." allow-clear>
          <template #prefix>
            <IconLock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button long type="primary" html-type="submit" :loading="loading" font-bold>
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <div flex-center>
      <LayoutNavDarkToggle />
      <span ml-5 op-50 text-xl> {{ APP_META.author }} </span>
    </div>
  </a-card>
</template>
