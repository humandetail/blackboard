import { Settings } from '@/types'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings>({
    launch: false,
    width: 400,
    height: 300
  })

  return {
    settings
  }
})
