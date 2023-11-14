<template>
  <a-select
    :value="currentValue"
    :options="options"
    mode="multiple"
    size="small"
    :style="$attrs.style || { 'min-width': '120px' }"
    show-arrow
    :show-search="false"
    @update:value="handleValueChange"
  >
    <template #tagRender="{ value, label }">
      {{ formatFn(value, label) }}
    </template>
    <template #dropdownRender="{ menuNode: menu }">
      <v-nodes :vnodes="menu" />
      <a-divider style="margin: 4px 0" />
      <a-space style="padding: 4px 8px">
        <a-input-number
          :value="currentValue[0]"
          :min="0"
          :step="$attrs.step"
          style="width: auto"
          @update:value="handleInputValueChange"
        />
      </a-space>
    </template>
  </a-select>
</template>

<script setup lang="ts">
type ModalValue = number | string

const props = defineProps<{
  modelValue: ModalValue
  options: Record<string | number, ModalValue>[]
  format: (value: ModalValue, label: ModalValue) => string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value?: ModalValue): void
}>()

const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true
    }
  },
  render () {
    return this.vnodes
  }
})

const currentValue = computed(() => {
  if ((props.modelValue ?? undefined) === undefined) {
    return []
  }

  return [props.modelValue]
})

const formatFn = computed(() => {
  return typeof props.format === 'function'
    ? props.format
    : (value: ModalValue, label: ModalValue) => label ?? value
})

const handleValueChange = (e: ModalValue[]) => {
  console.log(e)
  emits('update:modelValue', e.at(-1))
}

const handleInputValueChange = (e: ModalValue) => {
  emits('update:modelValue', e)
}
</script>
