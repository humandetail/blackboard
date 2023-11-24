<template>
  <section class="toolbar-section">
    <div
      class="tools-group"
      v-for="(group, groupIndex) of tools"
      :key="groupIndex"
    >
      <a-tooltip
        v-for="tool of group"
        :key="tool.value"
        :title="tool.label"
      >
        <a-button
          :type="tool.value === settingsStore.currentTool.value ? 'primary' : 'text'"
          class="btn"
          :class="{
            active: tool.value === settingsStore.currentTool.value
          }"
          @click="handleToolClick(tool)"
        >
          <icon-font :type="tool.icon" :style="{ fontSize: '20px' }" />
        </a-button>
      </a-tooltip>
    </div>
  </section>
</template>

<script setup lang="ts">
import { tools } from '@/definitions'
import IconFont from '@/components/common/icons/IconFont'
import { useSettingsStore } from '@/store'
import type { ToolItem } from '@/types'

const settingsStore = useSettingsStore()

const handleToolClick = (tool: ToolItem) => {
  settingsStore.changeTool(tool)
}
</script>

<style lang="scss" scoped>
.toolbar-section {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 5px 16px !important;

  .tools-group {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    :deep(.ant-btn) {
      padding: 4px;
    }
  }
}
</style>
