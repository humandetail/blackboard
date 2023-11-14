<template>
  <a-modal
    width="400px"
    title="批量修改帧延迟"
    v-model:open="open"
    :footer="null"
    @cancel="handleClose"
  >
    <a-form
      :model="formState"
      name="delay"
      autocomplete="off"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="作用于"
        name="mode"
      >
        <a-radio-group
          v-model:value="formState.mode"
          :options="modeOptions"
        />
      </a-form-item>

      <a-form-item
        label="延迟时长"
        name="delay"
        :rules="[
          { required: true, message: '请输入延迟时长' }
        ]"
      >
        <a-input-number
          v-model:value="formState.delay"
          :min="0"
        >
          <template #addonAfter>
            秒
          </template>
        </a-input-number>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-space>
          <a-button type="primary" html-type="submit">确认</a-button>
          <a-button type="default" @click="handleClose">取消</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
export interface BatchChangeDelayFormState {
  mode: 'all' | 'selected',
  delay: number
}

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'submit', value: BatchChangeDelayFormState): void
}>()

const modeOptions = [
  { label: '全部帧', value: 'all' },
  { label: '选中帧', value: 'selected' }
]

const formState = reactive<BatchChangeDelayFormState>({
  mode: 'all',
  delay: 0
})

const open = ref(true)

const onFinish = (value: BatchChangeDelayFormState) => {
  emits('submit', value)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const handleClose = () => {
  emits('close')
}
</script>
