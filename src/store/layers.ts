import type { Id, LayerItem } from '@/types'
import { createId, isArray } from '@/utils'
import { defineStore } from 'pinia'
import { useFramesStore } from './frames'

export type ChangeSelectedLayersAction = 'default' | 'add' | 'delete'

export type MergeLayerAction = 'selected' | 'down'

const createLayer = (title: string, graphics?: Set<Id>) => {
  return {
    id: createId(),
    title,
    background: 'transparent',
    graphics: graphics ?? new Set(),
    visible: true,
    opacity: 100
  }
}

export const useLayersStore = defineStore('layers', () => {
  /** 图层集合 */
  const layers = ref<LayerItem[]>([])
  /** 当前展示图书 */
  const currentLayer = ref<LayerItem>()
  /** 选中的图层 */
  const selectedLayers = ref<Set<Id>>(new Set())

  const framesStore = useFramesStore()

  const init = (graphicId?: Id | Id[]) => {
    const layer = createLayer('图层1', new Set(isArray(graphicId) ? graphicId : graphicId !== undefined ? [graphicId] : []))
    layers.value = [layer]
    currentLayer.value = layer
    return layer
  }

  const newLayer = () => {
    const layer = createLayer(`图层${layers.value.length + 1}`)
    layers.value.push(layer)

    framesStore.currentFrame!.layers.add(layer.id)
  }

  const copyLayer = (id: Id | Id[]) => {
    const items = layers.value.filter(layer => {
      return (isArray(id)
        ? id.includes(layer.id)
        : layer.id === id)
    })

    if (items.length > 0) {
      const lastIdx = layers.value.findIndex(layer => layer.id === items.at(-1)!.id)

      layers.value.splice(lastIdx, 0, ...items)

      // 关联动画帧
      items.forEach(item => {
        if (item.visible) {
          framesStore.currentFrame!.layers.add(item.id)
        }
      })
    }
  }

  const deleteLayer = (id: Id | Id[]) => {
    layers.value = layers.value.filter(layer => {
      return !(isArray(id)
        ? id.includes(layer.id)
        : layer.id === id)
    })

    const ids = isArray(id) ? id : [id]

    // 删除帧的关联
    ids.forEach(layerId => {
      framesStore.frames.forEach(frame => {
        frame.layers.delete(layerId)
      })
    })
  }

  const mergeLayer = (action: MergeLayerAction, id: Id) => {
    const idx = layers.value.findIndex(layer => layer.id === id)
    let graphics = new Set<Id>()
    let items: LayerItem[] = []
    let newLayer: LayerItem

    if (idx === -1) {
      return
    }

    switch (action) {
      case 'selected':
        if (selectedLayers.value.size === 0) {
          return
        }

        items = layers.value.filter(layer => selectedLayers.value.has(layer.id))

        // eslint-disable-next-line no-case-declarations
        graphics = items.reduce((prev, item) => {
          item.graphics.forEach(graphicId => {
            prev.add(graphicId)
          })
          return prev
        }, new Set<Id>())

        newLayer = createLayer(`图层${layers.value.length + 1}`, graphics)
        layers.value.splice(idx, 0, newLayer)

        // 增加关联
        framesStore.currentFrame!.layers.add(newLayer.id)

        layers.value = layers.value.filter(layer => !selectedLayers.value.has(layer.id))
        // 删除关联
        selectedLayers.value.forEach(layerId => {
          framesStore.frames.forEach(frame => {
            frame.layers.delete(layerId)
          })
        })

        selectedLayers.value.clear()
        break
      case 'down':
        items = layers.value.filter((_, index) => index <= idx)

        graphics = items.reduce((prev, item) => {
          item.graphics.forEach(graphicId => {
            prev.add(graphicId)
          })
          return prev
        }, new Set<Id>())

        newLayer = createLayer(`图层${layers.value.length + 1}`, graphics)
        layers.value.splice(idx, items.length, newLayer)

        // 增加关联
        framesStore.currentFrame!.layers.add(newLayer.id)

        // 删除关联
        items.forEach(item => {
          framesStore.frames.forEach(frame => {
            frame.layers.delete(item.id)
          })
        })
        break
      default:
        break
    }
  }

  const changeCurrentLayer = (LayerItem: LayerItem) => {
    currentLayer.value = LayerItem
  }

  const changeSelectedLayers = <T extends Id = Id>(
    value: T | T[],
    action: ChangeSelectedLayersAction = 'default'
  ) => {
    const ids = isArray(value) ? [...value] : [value]

    switch (action) {
      case 'add':
        ids.forEach(id => {
          selectedLayers.value.add(id)
        })
        break
      case 'delete':
        ids.forEach(id => {
          selectedLayers.value.delete(id)
        })
        break
      case 'default':
      default:
        selectedLayers.value = new Set(ids)
        break
    }
  }

  return {
    layers,
    currentLayer,
    selectedLayers,

    init,
    newLayer,
    copyLayer,
    deleteLayer,
    mergeLayer,
    changeCurrentLayer,
    changeSelectedLayers
  }
})
