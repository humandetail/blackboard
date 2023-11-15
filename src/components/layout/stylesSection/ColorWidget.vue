<template>
  <widget-wrapper :title="title">
    <div class="color-wrapper">
      <label
        class="current-color"
        :class="{
          transparent: modelValue === 'transparent'
        }"
        :style="{
          '--color': modelValue
        }"
      >
        <input
          :value="modelValue"
          type="color"
          class="current-color-input"
          @change="handleColorChange"
        />
      </label>
      <ul class="colors">
        <li
          v-for="color of colors"
          :key="color.value"
          class="color-item"
          :class="{
            transparent: color.value === 'transparent',
            active: modelValue && color.value.toUpperCase() === modelValue.toUpperCase()
          }"
          :title="color.label"
          :style="{
            '--color': color.value
          }"
          @click="handleColorClick(color.value)"
        >
        </li>
      </ul>
    </div>
  </widget-wrapper>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
import { colors } from '@/definitions'

defineProps<{
  title: 'string'
  modelValue: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const { token } = theme.useToken()

const handleColorChange = (e: Event) => {
  const target = e.target as HTMLInputElement

  emits('update:modelValue', target.value)
}

const handleColorClick = (color: string) => {
  emits('update:modelValue', color)
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.color-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .current-color {
    display: block;
    width: 26px;
    height: 62px;

    .current-color-input {
      visibility: hidden;
    }
  }

  .colors {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    width: 106px;
    margin: 0;
    padding: 0;

    .color-item {
      list-style: none;
      width: 18px;
      height: 18px;

      &.active {
        border-color: v-bind('token.colorWhite');
      }
    }
  }

  :where(.current-color),
  :where(.color-item) {
    border-radius: v-bind('`${token.borderRadiusSM}px`');
    border: 1px solid v-bind('token.colorBorder');
    cursor: pointer;

    &.transparent {
      @include transparentBg(8px);
    }

    &:not(.transparent) {
      background-color: var(--color);
    }
  }
}
</style>
