<template>
  <div class="frame-item-wrapper">
    <div
      class="frame-item"
      :class="{
        active: activeFrame === frame.id
      }"
      :draggable="true"
      :data-id="frame.id"
      @dragstart="event => emits('dragstart', event)"
      @dragend="event => emits('dragend', event)"
      @click="handleItemClick"
    >
      <div class="index">{{ index + 1 }}</div>
      <div class="preview">
        <svg class="bg" viewBox="0 0 100 100" width="92" height="92">
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            :stroke="token.colorWhite"
            stroke-width="1"
            stroke-dasharray="50"
            stroke-dashoffset="25"
            fill="none"
          />
        </svg>
      </div>
      <custom-select
        :modelValue="frame.delay"
        :options="delayOptions"
        :step="0.1"
        :format="(value: any) => `${value} 秒`"
        style="min-width: 80px;"
        @update:modelValue="handleDelayChange"
      />
    </div>

    <div
      v-if="index === 0"
      class="frame-dropzone dropzone-previous"
      :data-index="-1"
      data-drag-action="move"
      @dragover="e => emits('dragover', e)"
      @dragenter="e => emits('dragenter', e)"
      @dragleave="e => emits('dragleave', e)"
      @drop="e => emits('drop', e)"
    ></div>
    <div
      class="frame-dropzone"
      :data-index="index"
      data-drag-action="move"
      @dragover="e => emits('dragover', e)"
      @dragenter="e => emits('dragenter', e)"
      @dragleave="e => emits('dragleave', e)"
      @drop="e => emits('drop', e)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import type { FrameItem } from '@/types'

const props = defineProps<{
  frame: FrameItem
  index: number
  activeFrame?: number
}>()

const emits = defineEmits<{
  (e: 'change', value: FrameItem): void
  (e: 'update:active-frame', value: FrameItem['id']): void
  (e: 'dragstart', value: DragEvent): void
  (e: 'dragend', value: DragEvent): void
  (e: 'dragover', value: DragEvent): void
  (e: 'dragenter', value: DragEvent): void
  (e: 'dragleave', value: DragEvent): void
  (e: 'drop', value: DragEvent): void
}>()

const delayOptions = [
  { label: '0.1秒', value: 0.1 },
  { label: '0.2秒', value: 0.2 },
  { label: '0.5秒', value: 0.5 },
  { label: '1秒', value: 1 },
  { label: '2秒', value: 2 },
  { label: '5秒', value: 5 },
  { label: '10秒', value: 10 }
]

const { token } = theme.useToken()

const handleItemClick = () => {
  emits('update:active-frame', props.frame.id)
}

const handleDelayChange = (delay: number) => {
  emits('change', {
    ...props.frame,
    delay
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.frame-item-wrapper {
  display: inline-block;
  position: relative;
  margin: 8px 4px;

  .frame-dropzone {
    position: absolute;
    right: -12px;
    top: 0;
    z-index: 3;
    width: 16px;
    height: 100%;

    &::after {
      content: '';
      display: none;
      position: absolute;
      left: 50%;
      top: 0;
      width: 8px;
      height: 100%;
      margin-left: -4px;
      border: 1px solid v-bind('token.colorPrimary');
    }

    &.dropzone-previous {
      right: auto;
      left: 0;
    }

    &.dragover {
      &::after {
        display: block;
      }
    }
  }
}

.frame-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  cursor: pointer;

  .preview {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 84px;
    height: 84px;
    @include transparentBg(8px);

    .bg {
      display: none;
      position: absolute;
      left: -4px;
      top: -4px;
    }
  }

  .index {
    position: absolute;
    left: 8px;
    top: 8px;
    z-index: 2;
    display: block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 12px;
    border-radius: 2px;
    background-color: v-bind('token.colorBgElevated');
  }

  &.active {
    background-color: v-bind('token.colorBgElevated');
    .preview {
      .bg {
        display: block;
      }
    }
  }

  &.dragging {
    opacity: 0.5;
  }
}
</style>
