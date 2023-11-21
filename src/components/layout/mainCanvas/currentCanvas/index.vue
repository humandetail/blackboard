<template>
  <div class="current-canvas-container">
    <canvas
      id="current-canvas"
      class="current-canvas"
      ref="currentCanvasRef"
      :width="settings.width"
      :height="settings.height"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store'
import { Canvas, PencilBrush } from 'fabric'

const settingsStore = useSettingsStore()

const settings = computed(() => settingsStore.settings)

const currentCanvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (currentCanvasRef.value) {
    const canvas = new Canvas(currentCanvasRef.value, {
    })

    canvas.isDrawingMode = true
    const brush = canvas.freeDrawingBrush = new PencilBrush(canvas)
    brush.color = 'red'
    brush.width = 1
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.current-canvas-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .current-canvas {
    @include transparentBg()
  }
}
</style>
