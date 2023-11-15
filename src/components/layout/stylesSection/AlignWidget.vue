<template>
  <widget-wrapper title="对齐">
    <div class="wrapper">
      <a-button
        v-for="item of alignButtons"
        :key="item.value"
        :disabled="item.disabled"
        :title="item.name"
        size="small"
        class="btn"
        @click="emits('change', item.value)"
      >
        <icon-font :type="`icon-${item.icon}`" />
      </a-button>
    </div>
  </widget-wrapper>
</template>

<script setup lang="ts">
import IconFont from '@/components/common/icons/IconFont'
import { Align } from '@/definitions'
import { AlignButton } from '@/types'

const emits = defineEmits<{
  (e: 'change', value: Align): void
}>()

const alignButtons = computed<AlignButton[]>(() => [
  { name: '左对齐', value: Align.alignLeft, icon: 'align-left' },
  { name: '水平居中', value: Align.horizontalAlignCenter, icon: 'horizontal-align-center' },
  { name: '右对齐', value: Align.alignRight, icon: 'align-right' },
  { name: '水平等距分布', value: Align.horizontalUniformlySpaced, icon: 'horizontal-uniformly-spaced' },
  { name: '上对齐', value: Align.alignTop, icon: 'align-top' },
  { name: '垂直居中', value: Align.verticalAlignCenter, icon: 'vertical-align-center' },
  { name: '下对齐', value: Align.alignBottom, icon: 'align-bottom' },
  { name: '垂直等距分布', value: Align.verticalUniformlySpaced, icon: 'vertical-uniformly-spaced' }
])
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 7px;
}
</style>
