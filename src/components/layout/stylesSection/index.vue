<template>
  <section class="styles">
    <color-widget
      title="描边"
      v-model="borderColor"
    />

    <color-widget
      title="背景"
      v-model="backgroundColor"
    />

    <size-widget />

    <location-widget />

    <border-size-widget
      v-model:border-style="borderStyle"
      v-model:border-width="borderWidth"
    />
    <border-radius-widget
      v-model:is-rounded="isRounded"
      v-model:border-radius="borderRadius"
    />

    <align-widget />
  </section>
</template>

<script setup lang="ts">
import { BorderStyle } from '@/types'

const borderColor = ref('transparent')
const backgroundColor = ref('transparent')

const borderWidth = ref(0)
const borderStyle = ref<BorderStyle>('solid')
const borderRadius = ref(0)
const isRounded = ref(false)
</script>
