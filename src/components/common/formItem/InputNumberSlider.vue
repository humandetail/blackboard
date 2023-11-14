<template>
  <div
    class="input-number-slider"
  >
    <a-input-number
      :value="modelValue"
      :min="min"
      :max="max"
      :controls="false"
      v-bind="$attrs"
      size="small"
      @change="handleChange"
    >
      <template #addonAfter>
        <a-button
          ref="btnRef"
          type="text"
          size="small"
          @click="overlayVisible = !overlayVisible"
        >
          <UpOutlined v-if="overlayVisible" />
          <DownOutlined v-else />
        </a-button>
      </template>
    </a-input-number>

    <div
      v-show="overlayVisible"
      class="overlay"
    >
      <a-slider
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { onClickOutside } from '@vueuse/core'

withDefaults(defineProps<{
  modelValue?: number
  min?: number
  max?: number
  step?: number
}>(), {
  min: 0,
  max: 100,
  step: 1
})

const emits = defineEmits<{(e: 'update:modelValue', value: number): void}>()

const { token } = theme.useToken()

const btnRef = ref(null)

const overlayVisible = ref(false)

onClickOutside(btnRef, () => {
  overlayVisible.value = false
})

const handleChange = (val: number) => {
  emits('update:modelValue', val)
}
</script>

<style lang="scss" scoped>
.input-number-slider {
  position: relative;

  :deep(.ant-input-number-group-addon) {
    padding: 0;

    .ant-btn {
      height: auto;
      border: 0;
      border-radius: 0;
    }
  }

  .overlay {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    z-index: 1;
    padding: v-bind('`${token.paddingSM / 2}px`');
    background-color: v-bind('token.colorBgElevated');

    :deep(.ant-slider) {
      margin: 0;
    }
  }
}
</style>
