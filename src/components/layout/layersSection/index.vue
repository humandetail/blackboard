<template>
  <section class="layers-section">
    <header class="header">
      <div class="alpha-fluid">
        <form-item label="透明度">
          <input-number-slider v-model="testValue" />
        </form-item>

        <a-button
          v-for="item of operations"
          :key="item.name"
          type="text"
          size="small"
          class="btn dropzone"
          :title="item.name"
          :data-drag-action="item.dragAction"
          @dragover="handleDragOver"
          @dragenter="handleDragEnter"
          @dragleave="handleDragLeave"
          @drop="handleDrop"
        >
          <dynamic-icon :name="item.icon" />
        </a-button>
      </div>
    </header>

    <main class="layers">
      <layer-item
        v-for="(layer, index) of layers"
        :key="layer.id"
        :layer="layer"
        :index="index"
        v-model:active-layer="activeLayer"
        @change="handleLayerItemChange"
        @dragstart="handleDragStart"
        @dragend="handleDragEnd"
        @dragover="handleDragOver"
        @dragenter="handleDragEnter"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
      />
    </main>
  </section>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import type { LayerItem } from '@/types'

import { createId } from '@/utils'

import DynamicIcon from '@/components/common/icons/DynamicIcon'

const { token } = theme.useToken()
const testValue = ref(1)

const activeLayer = ref(1)
const layers = ref<LayerItem[]>([
  {
    id: createId(),
    title: '图层1',
    visible: true,
    data: null
  },
  {
    id: createId(),
    title: '图层1图层1图层1图层1图层1图层1图层1v',
    visible: false,
    data: null
  },
  ...Array.from({ length: 20 }, () => {
    const id = createId()
    return {
      id,
      title: `图层${id}`,
      visible: true,
      data: null
    }
  })
])

const operations = ref([
  { name: '新建图层', icon: 'FileOutlined', dragAction: 'copy' },
  { name: '删除图层', icon: 'DeleteOutlined', dragAction: 'delete' }
])

const {
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop
} = useDrag(layers, 'dropzone')

const handleLayerItemChange = (layer: LayerItem) => {
  layers.value = layers.value.map(item => {
    return item.id === layer.id
      ? layer
      : item
  })
}
</script>

<style lang="scss" scoped>
.layers-section {
  padding: v-bind('`${token.paddingSM}px`') 0;

  .header {
    position: sticky;
    top: 40px;
    z-index: 2;
    background-color: v-bind('token.colorBgElevated');

    .alpha-fluid {
      display: flex;
      align-items: center;

      .btn {
        &.dragover {
          background-color: v-bind('token.colorPrimary') !important;
        }
      }
    }
  }
}
</style>
