import { createId } from '@/utils'
import type { IdRecord } from '../types'

export default (dataSource: Ref<Array<IdRecord & Record<any, any>>>, targetClassName: string) => {
  let sourceElement: HTMLElement | null = null
  let sourceId: unknown

  // 可拖动目标上触发的事件
  const handleDragStart = (e: DragEvent) => {
    sourceElement = e.target as HTMLElement

    sourceElement.classList.add('dragging')

    sourceId = sourceElement.dataset.id
  }

  const handleDragEnd = (_e: DragEvent) => {
    sourceElement!.classList.remove('dragging')
    sourceElement = null
  }

  // 可放置的目标上触发的事件
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
  }

  const handleDragEnter = (e: DragEvent) => {
    const target = e.target as HTMLElement

    if (target.classList.contains(targetClassName)) {
      target.classList.add('dragover')
    }
  }

  const handleDragLeave = (e: DragEvent) => {
    const target = e.target as HTMLElement

    if (target.classList.contains(targetClassName)) {
      target.classList.remove('dragover')
    }
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()

    const target = e.target as HTMLElement

    if (target.classList.contains(targetClassName)) {
      target.classList.remove('dragover')
      // eslint-disable-next-line eqeqeq
      const idx = dataSource.value.findIndex(item => item.id == sourceId)

      if (idx === -1) {
        return
      }

      switch (target.dataset.dragAction) {
        case 'move':
          // eslint-disable-next-line no-case-declarations
          const targetIdx = Number(target.dataset.index)

          dataSource.value.splice(targetIdx + 1, 0, dataSource.value[idx])

          if (targetIdx > idx) {
            dataSource.value.splice(idx, 1)
          } else {
            dataSource.value.splice(idx + 1, 1)
          }
          break
        case 'copy':
          // eslint-disable-next-line no-case-declarations
          const newItem = {
            ...dataSource.value[idx],
            id: createId(),
            ...'title' in dataSource.value[idx]
              ? { title: dataSource.value[idx].title + ' 复制' }
              : null
          }
          dataSource.value.splice(idx, 0, newItem)
          break
        case 'delete':
          dataSource.value.splice(idx, 1)
          break
        default:
          break
      }
    }
  }

  return {
    handleDragOver,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    handleDragLeave,
    handleDrop
  }
}
