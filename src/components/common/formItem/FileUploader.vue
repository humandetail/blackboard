<template>
  <a-upload-dragger
    v-model:fileList="fileList"
    name="file"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <p class="ant-upload-drag-icon">
      <inbox-outlined />
    </p>
    <p class="ant-upload-text">点击或拖拽文件到这里上传</p>
  </a-upload-dragger>
</template>

<script setup lang="ts">
import type { UploadProps, UploadChangeParam, UploadFile } from 'ant-design-vue'

const props = defineProps<{
  value?: UploadFile
}>()

const emits = defineEmits<{
  (e: 'update:value', value?: UploadFile): void
}>()

const fileList = computed<UploadProps['fileList']>(() => props.value ? [props.value] : [])

const handleChange = (info: UploadChangeParam) => {
  emits('update:value', info.file)
}

const beforeUpload: UploadProps['beforeUpload'] = file => {
  emits('update:value', file)
  return false
}
</script>
