import type { FrameItem, Id } from '@/types'
import { createId, isArray } from '@/utils'
import { defineStore } from 'pinia'

export type ChangeSelectedFramesAction = 'default' | 'add' | 'delete'

const createFrame = ({
  layers,
  delay = 0
}: Partial<FrameItem> = {}): FrameItem => {
  return {
    id: createId(),
    delay,
    layers: new Set(layers)
  }
}

export const useFramesStore = defineStore('frames', () => {
  /** 帧动画集合 */
  const frames = ref<FrameItem[]>([])
  /** 当前展示帧 */
  const currentFrame = ref<FrameItem>()
  /** 选中的帧 */
  const selectedFrames = ref<Set<Id>>(new Set())
  /** 动画循环次数 */
  const cycleIndex = ref(0)

  const init = (layerId: Id | Id[], initialCycleIndex = 0) => {
    const frame = createFrame({
      layers: new Set(isArray(layerId) ? layerId : [layerId])
    })
    frames.value = [frame]
    currentFrame.value = frame
    cycleIndex.value = initialCycleIndex

    return frame
  }

  const newFrame = (selectedLayers: Array<Id> = []) => {
    const frame = createFrame({ layers: new Set(selectedLayers) })
    frames.value.push(frame)
    return frame
  }

  const copyFrame = (id: Id | Id[]) => {
    const items = frames.value.filter(frame => {
      return (isArray(id)
        ? id.includes(frame.id)
        : frame.id === id)
    })

    if (items.length > 0) {
      const lastIdx = frames.value.findIndex(frame => frame.id === items.at(-1)!.id)

      frames.value.splice(lastIdx, 0, ...items)
    }
  }

  const deleteFrame = (id: Id | Id[]) => {
    frames.value = frames.value.filter(frame => {
      return !(Array.isArray(id)
        ? id.includes(frame.id)
        : frame.id === id)
    })
  }

  const changeCurrentFrame = (frameItem: FrameItem) => {
    currentFrame.value = frameItem
  }

  const changeSelectedFrames = <T extends Id = Id>(
    value: T | T[],
    action: ChangeSelectedFramesAction = 'default'
  ) => {
    const ids = isArray(value) ? [...value] : [value]

    switch (action) {
      case 'add':
        ids.forEach(id => {
          selectedFrames.value.add(id)
        })
        break
      case 'delete':
        ids.forEach(id => {
          selectedFrames.value.delete(id)
        })
        break
      case 'default':
      default:
        selectedFrames.value = new Set(ids)
        break
    }
  }

  const updateCycleIndex = (index: number) => {
    cycleIndex.value = index
  }

  return {
    frames,
    currentFrame,
    selectedFrames,
    cycleIndex,

    init,
    newFrame,
    copyFrame,
    deleteFrame,
    changeCurrentFrame,
    changeSelectedFrames,
    updateCycleIndex
  }
})
