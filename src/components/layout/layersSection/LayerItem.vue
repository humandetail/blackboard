<template>
  <div class="layer-item-wrapper">
    <div
      class="layer-item"
      :class="{
        active: activeLayer === layer.id
      }"
      :draggable="true"
      :data-id="layer.id"
      @dragstart="event => emits('dragstart', event)"
      @dragend="event => emits('dragend', event)"
      @click="handleItemClick"
    >
      <a-button
        type="text"
        class="btn-visible"
        @click.stop="handleVisibleClick"
      >
        <EyeOutlined v-if="layer.visible" />
        <EyeInvisibleOutlined v-else />
      </a-button>

      <div class="preview">
        <canvas
          ref="previewCanvasRef"
          :width="settingsStore.settings.width"
          :height="settingsStore.settings.height"
          :style="{
            transformOrigin: 'center center',
            transform: `translate(-50%, -50%) scale(${scale}, ${scale})`
          }"
        ></canvas>
        <svg class="bg" viewBox="0 0 32 32" width="32" height="32">
          <rect
            x="0"
            y="0"
            width="32"
            height="32"
            :stroke="token.colorBorder"
            stroke-width="1"
            stroke-dasharray="16"
            stroke-dashoffset="8"
            fill="none"
          />
        </svg>
      </div>

      <h3 class="title">
        {{ layer.title }}
      </h3>
    </div>

    <div
      v-if="index === 0"
      class="dropzone dropzone-previous"
      :data-index="-1"
      data-drag-action="move"
      @dragover="e => emits('dragover', e)"
      @dragenter="e => emits('dragenter', e)"
      @dragleave="e => emits('dragleave', e)"
      @drop="e => emits('drop', e)"
    ></div>
    <div
      class="dropzone"
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
import { GraphicItem, useGraphicsStore, useSettingsStore } from '@/store'
import type { LayerItem } from '@/types'
import { theme } from 'ant-design-vue'
import { StaticCanvas } from 'fabric'

const props = defineProps<{
  layer: LayerItem
  index: number
  activeLayer?: number
}>()

const emits = defineEmits<{
  (e: 'change', value: LayerItem): void
  (e: 'update:active-layer', value: LayerItem['id']): void
  (e: 'dragstart', value: DragEvent): void
  (e: 'dragend', value: DragEvent): void
  (e: 'dragover', value: DragEvent): void
  (e: 'dragenter', value: DragEvent): void
  (e: 'dragleave', value: DragEvent): void
  (e: 'drop', value: DragEvent): void
}>()

const { token } = theme.useToken()

const previewCanvasRef = ref()

const graphicsStore = useGraphicsStore()
const settingsStore = useSettingsStore()

// 当前图层所有图像
const graphics = computed(() => {
  const graphics: GraphicItem[] = []
  props.layer.graphics.forEach(id => {
    const graphic = graphicsStore.graphics.get(id)
    if (graphic) {
      graphics.push(graphic)
    }
  })

  return graphics
})

const previewSize = 24

const scale = computed(() => {
  const { width, height } = settingsStore.settings
  return width > height
    ? previewSize / width
    : previewSize / height
})

let canvas: StaticCanvas

watch(graphics, async () => {
  if (!canvas) {
    await nextTick()
    canvas = new StaticCanvas(previewCanvasRef.value)
  }

  canvas.clear()

  const objects = Array.from(graphics.value)
  const len = objects.length
  for (let i = 0; i < len; i++) {
    canvas.add(await objects[i].clone())
  }
}, { deep: true })

const handleItemClick = () => {
  emits('update:active-layer', props.layer.id)
}

const handleVisibleClick = () => {
  emits('change', {
    ...props.layer,
    visible: !props.layer.visible
  })
}

</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.layer-item-wrapper {
  position: relative;

  .dropzone {
    position: absolute;
    left: 0;
    bottom: -8px;
    z-index: 2;
    width: 100%;
    height: 16px;

    &::after {
      content: '';
      display: none;
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 4px;
      margin-top: -2px;
      border: 1px solid v-bind('token.colorPrimary');
    }

    &.dropzone-previous {
      bottom: auto;
      top: 0px;
    }

    &.dragover {
      &::after {
        display: block;
      }
    }
  }
}

.layer-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-top: 1px solid v-bind('token.colorBorder');
  cursor: pointer;

  .preview {
    position: relative;
    z-index: 1;
    width: 24px;
    height: 24px;

    .bg {
      display: none;
      position: absolute;
      left: -4px;
      top: -4px;
    }

    > canvas {
      position: absolute;
      left: 50%;
      top: 50%;
      @include transparentBg(v-bind('`${settingsStore.settings.width / 4}px`'));
    }
  }

  .title {
    flex: 1;
    margin: 0;
    padding: 0 8px;
    font-size: 14px;
    line-height: 32px;
    @include textEllipse;
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
