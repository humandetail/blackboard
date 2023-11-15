<template>
  <widget-wrapper
    title="边框样式"
  >
    <div class="wrapper style-wrapper">
      <a-button
        v-for="style of borderStyles"
        :key="style.value"
        :type="borderStyle === style.value ? 'primary' : 'text'"
        size="small"
        :title="style.name"
        @click="handleBtnClick(style.value)"
      >
        <dynamic-icon :name="style.icon" />
      </a-button>

      <a-input-number
        :min="0"
        size="small"
        :controls="false"
        :precision="0"
        class="value-input"
        :value="borderWidth"
        @change="emits('update:border-width', $event)"
      />
    </div>
  </widget-wrapper>
</template>

<script setup lang="ts">
import type { BorderStyle } from '@/types'

import DynamicIcon from '@/components/common/icons/DynamicIcon'

const props = defineProps<{
  borderStyle?: BorderStyle
  borderWidth?: number
}>()

const emits = defineEmits<{
  (e: 'update:border-style', value?: BorderStyle): void
  (e: 'update:border-width', value: number): void
}>()

const borderStyles: Array<{
  name: string,
  value: BorderStyle
  icon: string
}> = [
  { name: '实线', value: 'solid', icon: 'LineOutlined' },
  { name: '虚线', value: 'dash', icon: 'DashOutlined' }
]

const handleBtnClick = (value: BorderStyle) => {
  emits('update:border-style', props.borderStyle === value ? undefined : value)
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  gap: 4px;

  .value-input {
    flex: 1;
    width: auto;
  }
}
</style>
