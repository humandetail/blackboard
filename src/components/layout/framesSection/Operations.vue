<template>
  <div class="frames-operations">
    <div class="play-operations-wrapper">
      <custom-select
        v-model="cycleIndex"
        :options="cycleIndexOptions"
        :format="(value: any) => value === 0 ? '永远循环' : `循环 ${value} 次`"
      />

      <a-button
        v-for="item of playOperations"
        :key="item.name"
        :title="item.name"
        :disabled="item.disabled"
        type="text"
        size="small"
        class="btn"
      >
        <dynamic-icon :name="item.icon" />
      </a-button>
    </div>

    <a-divider type="vertical"></a-divider>

    <div class="operations-wrapper">

      <a-button
        v-for="item of operations"
        :key="item.name"
        :title="item.name"
        :draggable="true"
        :data-drag-action="item.dragAction"
        type="text"
        class="btn frame-dropzone"
        @dragover="(e: DragEvent )=> emits('dragover', e)"
        @dragenter="(e: DragEvent )=> emits('dragenter', e)"
        @dragleave="(e: DragEvent )=> emits('dragleave', e)"
        @drop="(e: DragEvent )=> emits('drop', e)"
      >
        <dynamic-icon :name="item.icon" />
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import DynamicIcon from '@/components/common/icons/DynamicIcon'

const emits = defineEmits<{
  (e: 'dragend', value: DragEvent): void
  (e: 'dragover', value: DragEvent): void
  (e: 'dragenter', value: DragEvent): void
  (e: 'dragleave', value: DragEvent): void
  (e: 'drop', value: DragEvent): void
}>()

const { token } = theme.useToken()

const cycleIndex = ref(0)
const cycleIndexOptions = [
  { label: '1 次', value: 1 },
  { label: '3 次', value: 3 },
  { label: '永远', value: 0 }
]

const playOperations = ref([
  {
    name: '选择第一帧',
    icon: 'StepBackwardOutlined',
    disabled: true
  },
  {
    name: '选择上一帧',
    icon: 'BackwardOutlined',
    disabled: true
  },
  {
    name: '播放动画',
    icon: 'CaretRightOutlined',
    disabled: true
  },
  {
    name: '选择下一帧',
    icon: 'ForwardOutlined',
    disabled: true
  },
  {
    name: '选择最后一帧',
    icon: 'StepForwardOutlined',
    disabled: true
  }
])

const operations = ref([
  { name: '复制所选帧', icon: 'FileOutlined', dragAction: 'copy' },
  { name: '删除所选帧', icon: 'DeleteOutlined', dragAction: 'delete' }
])
</script>

<style lang="scss" scoped>
.frames-operations {
  display: flex;
  align-items: center;
  gap: 4px;

  .btn {
    &.dragover {
      background-color: v-bind('token.colorPrimary') !important;
    }
  }
}
</style>
