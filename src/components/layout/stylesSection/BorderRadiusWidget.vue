<template>
  <widget-wrapper
    title="边角"
  >
    <div class="wrapper radius-wrapper">
      <a-button
        :type="isRounded ? 'primary' : 'text'"
        size="small"
        title="圆角"
        @click="handleBtnClick"
      >
        <RadiusUprightOutlined />
      </a-button>

      <a-input-number
        :min="0"
        size="small"
        :controls="false"
        :precision="0"
        class="value-input"
        :value="radius"
        @change="emits('update:radius', $event)"
      />
    </div>
  </widget-wrapper>
</template>

<script setup lang="ts">
const props = defineProps<{
  isRounded?: boolean,
  radius?: number
}>()

const emits = defineEmits<{
  (e: 'update:is-rounded', value: boolean): void
  (e: 'update:radius', value: number): void
}>()

const handleBtnClick = () => {
  emits('update:is-rounded', !props.isRounded)
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
