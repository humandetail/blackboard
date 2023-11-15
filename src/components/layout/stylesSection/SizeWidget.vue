<template>
  <widget-wrapper
    title="尺寸"
  >
    <div class="wrapper">
      <div class="fluid">
        <div class="name">宽度:</div>
        <a-input-number
          :value="width"
          :min="0"
          size="small"
          class="value-input"
          :controls="false"
          :precision="0"
          @update:value="handleSizeChange($event, 'width')"
        />
      </div>
      <a-button
        :type="isLockRatio ? 'primary' : 'text'"
        size="small"
        class="btn-lock"
        :title="isLockRatio ? '解锁' : '锁定'"
        :class="{
          locked: isLockRatio
        }"
        :disabled="!isLockRatio && (width === 0 || height === 0)"
        @click="handleLockBtnClick"
      >
        <LinkOutlined v-if="!isLockRatio" />
        <DisconnectOutlined v-else />
      </a-button>
      <div class="fluid">
        <div class="name">高度:</div>
        <a-input-number
          :value="height"
          :min="0"
          size="small"
          class="value-input"
          :controls="false"
          :precision="0"
          @update:value="handleSizeChange($event, 'height')"
        />
      </div>
    </div>
  </widget-wrapper>
</template>

<script setup lang="ts">
const isLockRatio = ref(false)

const width = ref(0)
const height = ref(0)

const ratio = ref(1)

const handleLockBtnClick = () => {
  isLockRatio.value = !isLockRatio.value

  if (isLockRatio.value) {
    ratio.value = width.value === height.value
      ? 1
      : width.value / height.value
  }
}

const handleSizeChange = (val: number, type: 'width' | 'height') => {
  switch (type) {
    case 'width':
      width.value = val
      if (isLockRatio.value) {
        height.value = width.value / ratio.value
      }
      break
    case 'height':
      height.value = val
      if (isLockRatio.value) {
        width.value = height.value * ratio.value
      }
      break
    default:
      break
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: flex-end;
  gap: 2px;

  .fluid {
    .name {
      font-size: 12px;
      transform: scale(0.9);
    }

    .value-input {
      flex: 1;
      width: auto;
      font-size: 12px;
    }
  }
}
</style>
