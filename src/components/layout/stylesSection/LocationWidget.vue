<template>
  <widget-wrapper
    title="位置"
  >
    <div class="wrapper">
      <div class="fluid">
        <div class="name">x:</div>
        <a-input-number
          :value="x"
          :min="0"
          size="small"
          class="value-input"
          :controls="false"
          :precision="0"
          @update:value="emits('update:x', $event)"
        />
      </div>
      <div class="fluid">
        <div class="name">y:</div>
        <a-input-number
          :value="y"
          :min="0"
          size="small"
          class="value-input"
          :controls="false"
          :precision="0"
          @update:value="emits('update:y', $event)"
        />
      </div>
    </div>
  </widget-wrapper>
</template>

<script setup lang="ts">
defineProps<{
  x?: number
  y?: number
}>()

const emits = defineEmits<{
  (e: 'update:x', val: number): void
  (e: 'update:y', val: number): void
}>()
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
