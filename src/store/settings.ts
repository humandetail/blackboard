import { ToolType, tools as initialTools } from '@/definitions'
import { Settings, ToolItem } from '@/types'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings>({
    launch: false,
    width: 400,
    height: 300,
    PIXEL_RATIO: (function () {
      const c = document.createElement('canvas')
      const ctx = c.getContext('2d') as any
      const dpr = window.devicePixelRatio || 1
      const bsr = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1

      return dpr / bsr
    })()
  })

  const selectTool = initialTools.flat(1).find(tool => tool.value === ToolType.select)!
  const currentTool = ref<ToolItem>(selectTool)

  const changeTool = (tool?: ToolItem) => {
    currentTool.value = tool ?? selectTool
  }

  return {
    settings,
    currentTool,

    changeTool
  }
})
