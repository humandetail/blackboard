<template>
  <a-dropdown :trigger="['click']">
    <a-button
      type="text"
      style="margin-left: auto"
    >
      <MenuOutlined />
    </a-button>

    <template #overlay>
      <a-menu
        :items="menus"
        @click="handleMenuClick"
      />
    </template>
  </a-dropdown>

  <batch-change-delay-modal
    v-if="batchChangeDelayModalVisible"
    @submit="handleBatchChangeDelay"
    @close="batchChangeDelayModalVisible = false"
  />
</template>

<script setup lang="ts">
import type { BatchChangeDelayFormState } from './BatchChangeDelayModal.vue'

const batchChangeDelayModalVisible = ref(false)

const menus = [
  { label: '新建帧', key: 'new' },
  { label: '删除选中帧', key: 'delete' },
  { type: 'divider' },
  { label: '批量修改帧延迟', key: 'batchChangeDelay' },
  { type: 'divider' },
  { label: '关闭选项卡', key: 'close' }
]

const handleMenuClick = ({ key }: { key: string }) => {
  console.log(key)
  switch (key) {
    case 'new':
      break
    case 'delete':
      break
    case 'batchChangeDelay':
      batchChangeDelayModalVisible.value = true
      break
    case 'close':
      break
    default:
      break
  }
}

const handleBatchChangeDelay = (formState: BatchChangeDelayFormState) => {
  console.log(formState)
  batchChangeDelayModalVisible.value = false
}
</script>
