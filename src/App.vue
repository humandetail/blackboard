<template>
  <a-config-provider
    :theme="{
      algorithm: theme.darkAlgorithm
    }"
  >
    <layout />
  </a-config-provider>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue'
</script>
