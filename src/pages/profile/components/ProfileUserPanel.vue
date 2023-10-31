<script lang="ts" setup>
import type { FileItem } from '@arco-design/web-vue/es/upload/interfaces'

const authStore = useAuthStore()
const avatar = computed(() => authStore.user?.avatar)
function getFileUrl() {
  return authStore.user?.avatar
    ? {
        url: authStore.user.avatar,
      } as FileItem
    : undefined
}

let file = $ref<FileItem | undefined>(getFileUrl())
watch(avatar, () => file = getFileUrl())

function onChange(_: FileItem[], currentFile: FileItem) {
  file = { ...currentFile }
  getFileBase64(file.file!).then(async (_imageAsDateURL) => {
    authStore.updateAvatar(_imageAsDateURL)
    Message.success('上传成功')
  })
}

const imagePreviewVisible = ref(false)
const data = computed(() => {
  let _data = [
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
  if (!isSmallScreen.value) _data = _data.slice(0, 3)
  return _data
})

const descriptionsColumn = computed(() => {
  if (isExtraLargeScreen.value) return 3
  if (isMediumScreen.value) return 2
  return 1
})
</script>

<template>
  <a-card :bordered="true">
    <a-space :size="64" pl-25px>
      <a-avatar :size="100" class="info-avatar" trigger-type="mask">
        <template #trigger-icon>
          <a-upload
            :auto-upload="false"
            list-type="picture-card"
            :file-list="file ? [file] : []"
            :show-file-list="false"
            @change="onChange"
            @before-upload="checkImageBeforeUpload"
          >
            <template #upload-button>
              <IconCamera mr4 text-18px hover:text-primary />
            </template>
          </a-upload>
          <IconEye text-18px hover:text-primary @click="imagePreviewVisible = true" />
        </template>
        <img v-if="file" :src="file.url">
      </a-avatar>
      <div v-if="file?.url">
        <a-image-preview
          v-model:visible="imagePreviewVisible"
          :src="file.url"
        />
      </div>
      <a-descriptions
        :data="data"
        :column="descriptionsColumn"
        align="right"
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
