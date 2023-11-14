<template>
  <div
    class="form-item"
    :class="[layout]"
  >
    <label
      v-if="label"
      class="form-item-label"
    >
      {{ label }}:
    </label>
    <span class="form-item-value">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  layout?: 'vertical' | 'horizontal'
  label?: string
}>(), {
  layout: 'horizontal'
})
</script>

<style lang="scss" scoped>
.form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  padding: 4px 8px;

  :deep(.input-number-slider) {
    position: static;
  }

  &.horizontal {
    flex-direction: row;
    align-items: center;
  }

  .form-item-label {
    font-size: 0.9em;
    white-space: nowrap;
  }
}
</style>
