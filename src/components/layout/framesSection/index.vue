<template>
  <section class="frames-section">
    <header class="header">
      <h2 class="title">
        帧动画
      </h2>

      <operations
        @dragover="handleDragOver"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
      />

      <more-operations />
    </header>

    <main class="wrapper">
      <frame-item
        v-for="(frame, index) of framesStore.frames"
        :key="frame.id"
        :index="index"
        :frame="frame"
        :active-frame="activeFrame"
        @change="handelFrameChange"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        @dragover="handleDragOver"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
        @update:active-frames="framesStore.changeCurrentFrame"
      />
    </main>
  </section>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import type { FrameItem } from '@/types'

import { useFramesStore } from '@/store/frames'

const { token } = theme.useToken()

const activeFrame = ref(1)

const framesStore = useFramesStore()

const {
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop
} = useDrag(framesStore.frames, 'frame-dropzone')

const handelFrameChange = (frame: FrameItem) => {
  framesStore.frames = framesStore.frames.map(item => {
    if (item.id === frame.id) {
      return frame
    }

    return item
  })
}
</script>

<style lang="scss" scoped>
.frames-section {
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;

    .title {
      margin: 0;
      padding: 0 v-bind('`${token.padding}px`');
      font-size: 14px;
      line-height: 40px;
      background-color: v-bind('token.colorBgElevated');
    }
  }

  .wrapper {
    white-space: nowrap;
    overflow-y: auto;
  }
}
</style>
