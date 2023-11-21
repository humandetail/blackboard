<template>
  <main class="main-canvas-container">
    <launch-panel
      v-if="!settingsStore.settings.launch"
    />
    <current-canvas
      v-else
    />
  </main>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store'

const settingsStore = useSettingsStore()
</script>

<style lang="scss" scoped>
.main-canvas-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
