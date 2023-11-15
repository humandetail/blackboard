<template>
  <widget-wrapper title="旋转">
    <div class="wrapper">
      <a-button
        v-for="item of rotateButtons"
        :key="item.value"
        size="small"
        type="text"
      >
        <dynamic-icon :name="item.icon" />
      </a-button>

      <a-divider type="vertical" />

      <a-button
        v-for="item of flipButtons"
        :key="item.value"
        size="small"
        type="text"
      >
        <icon-font :type="`icon-${item.icon}`" />
      </a-button>
    </div>
  </widget-wrapper>
</template>

<script setup lang="ts">
import DynamicIcon from '@/components/common/icons/DynamicIcon'
import IconFont from '@/components/common/icons/IconFont'
import { Rotate } from '@/definitions'
const rotateButtons = [
  { name: '向左旋转45°', value: Rotate.left, icon: 'RotateLeftOutlined' },
  { name: '向右旋转45°', value: Rotate.right, icon: 'RotateRightOutlined' },
]

const flipButtons = [
  { name: '水平翻转', value: Rotate.flipHorizontal, icon: 'flip-horizontal' },
  { name: '垂直翻转', value: Rotate.flipVertical, icon: 'flip-vertical' },
]
</script>
