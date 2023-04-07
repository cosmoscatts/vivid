<script lang="ts" setup>
import type { FileItem } from '@arco-design/web-vue/es/upload/interfaces'
import { IconCamera, IconEye } from '@arco-design/web-vue/es/icon'

const authStore = useAuthStore()
const avatar = computed(() => authStore.user?.avatar)
const getFileUrl = () => authStore.user?.avatar
  ? {
      url: authStore.user.avatar,
    } as FileItem
  : undefined

let file = $ref<FileItem | undefined>(getFileUrl())
watch(avatar, () => file = getFileUrl())

function onChange(_: FileItem[], currentFile: FileItem) {
  file = {
    ...currentFile,
  }
  getFileBase64(file.file!).then(async (_imageAsDateURL) => {
    Message.success('上传成功')
  })
}

const { width } = useWindowSize()
const imagePreviewVisible = ref(false)
const data = computed(() => {
  return [
    {
      label: '账号',
      value: authStore.user?.username || '',
    },
    {
      label: '名称',
      value: authStore.user?.name || '',
    },
    {
      label: '创建时间',
      value: formatDate(authStore.user?.createTime),
    },
  ]
})
</script>

<template>
  <a-card :bordered="false">
    <a-space :size="64" pl-25px>
      <a-upload
        :auto-upload="false"
        list-type="picture-card"
        :file-list="file ? [file] : []"
        :show-file-list="false"
        :image-preview="true"
        @change="onChange"
        @before-upload="checkImageBeforeUpload"
      >
        <template #upload-button>
          <a-avatar :size="100" class="info-avatar" trigger-type="mask">
            <template #trigger-icon>
              <IconCamera text-24px />
            </template>
            <img v-if="file" :src="file.url">
          </a-avatar>
        </template>
      </a-upload>
      <div v-if="file?.url">
        <a-button type="text" @click="imagePreviewVisible = true">
          <IconEye />
          预览
        </a-button>
        <a-image-preview
          v-model:visible="imagePreviewVisible"
          :src="file.url"
        />
      </div>
      <a-descriptions
        lt-sm="hidden"
        :data="data"
        :column="2"
        align="right"
        :layout="width < 1000 ? 'horizontal' : 'inline-horizontal'"
        :label-style="{
          width: '100px',
          fontWeight: 'bold',
          color: 'rgb(var(--gray-8))',
        }"
        :value-style="{
          width: '180px',
          paddingLeft: '8px',
          textAlign: 'left',
        }"
      />
    </a-space>
  </a-card>
</template>
