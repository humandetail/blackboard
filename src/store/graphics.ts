import { Id } from '@/types'
import { createId, isArray } from '@/utils'
import type { Rect, Circle, Line, Textbox } from 'fabric'
import { defineStore } from 'pinia'
import { useLayersStore } from './layers'

export type GraphicItem = Rect | Circle | Line | Textbox

export const useGraphicsStore = defineStore('graphics', () => {
  const graphics = ref<Map<Id, Rect | Circle | Line | Textbox>>(new Map())

  const layersStore = useLayersStore()

  const deleteGraphic = (id: Id | Id[]) => {
    (isArray(id) ? id : [id]).forEach(i => {
      graphics.value.delete(i)

      layersStore.currentLayer!.graphics.delete(i)
    })
  }

  const addGraphic = (graphic: GraphicItem) => {
    const id = createId()
    graphics.value.set(id, graphic)
    layersStore.currentLayer!.graphics.add(id)
  }

  return {
    graphics,
    addGraphic,
    deleteGraphic
  }
})
