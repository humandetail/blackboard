import { Id } from '@/types'
import { createId, isArray } from '@/utils'
import type { FabricObject, FabricObjectProps, SerializedObjectProps, ObjectEvents } from 'fabric'
import { defineStore } from 'pinia'
import { useLayersStore } from './layers'

// export type GraphicItem = Rect | Circle | Line | Textbox

export type GraphicItem = FabricObject<Partial<FabricObjectProps>, SerializedObjectProps, ObjectEvents> & { graphicId?: Id }

export const useGraphicsStore = defineStore('graphics', () => {
  const graphics = ref<Map<Id, GraphicItem>>(new Map())

  const layersStore = useLayersStore()

  const deleteGraphic = (id: Id | Id[]) => {
    (isArray(id) ? id : [id]).forEach(i => {
      graphics.value.delete(i)

      layersStore.currentLayer!.graphics.delete(i)
    })
  }

  const addGraphic = (graphic: GraphicItem) => {
    const id = createId()
    graphic.graphicId = id
    graphics.value.set(id, graphic)
    layersStore.currentLayer!.graphics.add(id)

    return id
  }

  return {
    graphics,
    addGraphic,
    deleteGraphic
  }
})
