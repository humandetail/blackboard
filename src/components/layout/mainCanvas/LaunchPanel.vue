<template>
  <section class="launch-panel">
    <a-form
      :model="formState"
      name="launch"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      @finish="handleFinish"
    >
      <a-form-item
        label="宽度"
        name="width"
      >
        <a-input-number
          v-model:value="formState.width"
          :min="1"
        />
      </a-form-item>
      <a-form-item
        label="高度"
        name="width"
      >
        <a-input-number
          v-model:value="formState.height"
          :min="1"
        />
      </a-form-item>

      <a-form-item
        label="上传文件"
        name="width"
      >
        <file-uploader />
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 20, offset: 4 }">
        <a-button
          type="primary"
          html-type="submit"
          :disabled="disabled"
          style="width: 100%"
        >
          走你
        </a-button>
      </a-form-item>
    </a-form>
  </section>
</template>

<script setup lang="ts">
import { useSettingsStore, useLayersStore, useFramesStore } from '@/store'

const formState = reactive({
  width: 400,
  height: 300,
  file: null
})

const disabled = computed(() => {
  return !formState.file &&
    (!formState.width || !formState.height)
})

const settingsStore = useSettingsStore()
const layersStore = useLayersStore()
const framesStore = useFramesStore()

const handleFinish = () => {
  if (formState.file) {
    // @todo 解析文件
    return
  }

  settingsStore.settings = {
    ...settingsStore.settings,
    width: formState.width,
    height: formState.height,
    launch: true
  }

  // 初始化图层
  const newLayer = layersStore.init()
  // 初始化帧动画
  framesStore.init(newLayer.id)
}
</script>

<style lang="scss" scoped>
.launch-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  .ant-form {
    width: 400px;
  }
}
</style>
