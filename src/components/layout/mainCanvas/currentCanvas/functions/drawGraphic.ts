import { ToolType } from '@/definitions'
import { GraphicItem, useGraphicsStore, useSettingsStore } from '@/store'
import { Pointer } from '@/types'
import { calculateAngle, isMapperHasValue } from '@/utils'
import { Canvas, Rect, Line, Ellipse, Textbox, PencilBrush } from 'fabric'

export default (canvas: Canvas) => {
  const settingsStore = useSettingsStore()
  const graphicsStore = useGraphicsStore()

  const currentTool = computed(() => settingsStore.currentTool)

  canvas.on('mouse:down', handleMouseDown)

  watch(() => settingsStore.currentTool, (tool, prevTool) => {
    if (tool.value === ToolType.pencil) {
      onFreeDrawingStart()
    } else if (prevTool.value === ToolType.pencil) {
      onFreeDrawingFinish()
      canvas.isDrawingMode = false
    }
  })

  canvas.on('object:modified', (e) => {
    console.log('modified', e)
    const target = e.target as any

    if (graphicsStore.graphics.has(target.graphicId)) {
      graphicsStore.graphics.set(target.graphicId, target)
    }
  })

  let startPointer = {
    x: 0,
    y: 0
  }
  let graphic: GraphicItem | null = null

  function handleMouseDown (event: any) {
    if (currentTool.value.value === ToolType.select || currentTool.value.value === ToolType.pencil) {
      return
    }

    startPointer = Object.assign(event.pointer)
    canvas.selection = false

    canvas.on('mouse:move', handleMouseMove)
    canvas.on('mouse:up', handleMouseUp)
  }

  function handleMouseMove (event: any) {
    switch (settingsStore.currentTool.value) {
      case ToolType.square:
        drawRect(startPointer, event)
        break
      case ToolType.ellipse:
        drawEllipse(startPointer, event)
        break
      case ToolType.line:
        drawLine(startPointer, event)
        break
      case ToolType.text:
      default:
        break
    }
  }

  function handleMouseUp (event: any) {
    switch (settingsStore.currentTool.value) {
      case ToolType.square:
        drawRect(startPointer, event)
        break
      case ToolType.ellipse:
        drawEllipse(startPointer, event)
        break
      case ToolType.line:
        drawLine(startPointer, event)
        break
      case ToolType.text:
        drawTextbox(event.pointer)
        break
      default:
        break
    }

    if (graphic) {
      canvas.setActiveObject(graphic)
      settingsStore.changeTool()
      graphicsStore.addGraphic(graphic)
      graphic = null
    }
    canvas.selection = true

    canvas.off('mouse:move', handleMouseMove)
    canvas.off('mouse:up', handleMouseUp)
  }

  function drawRect ({ x: x1, y: y1 }: Pointer, e: any) {
    if (graphic) {
      canvas.remove(graphic)
      canvas.requestRenderAll()
    }

    const {
      pointer: {
        x: x2,
        y: y2
      },
      e: {
        shiftKey
      }
    } = e

    const width = x2 - x1
    let height = y2 - y1

    if (shiftKey) {
      height = (height > 0 ? 1 : -1) * Math.abs(width)
    }

    graphic = new Rect({
      left: width > 0 ? x1 : x1 + width,
      top: height > 0 ? y1 : y1 + height,
      width: Math.abs(width),
      height: Math.abs(height),
      fill: 'red'
    })
    canvas.add(graphic)
  }

  function drawLine ({ x: x1, y: y1 }: Pointer, e: any) {
    if (graphic) {
      canvas.remove(graphic)
      canvas.requestRenderAll()
    }

    const {
      pointer: {
        x,
        y
      },
      e: {
        shiftKey
      }
    } = e

    let x2 = x
    let y2 = y

    // fixed corner
    if (shiftKey) {
      const base = 15
      let corner = calculateAngle({ x: x1, y: y1 }, { x: x2, y: y2 })

      const mod = corner % base
      corner = base * (mod > base / 2 ? Math.ceil(corner / base) : Math.floor(corner / base))

      const sideC = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
      const newSideA = sideC * Math.cos(corner * Math.PI / 180)
      const newSideB = sideC * Math.sin(corner * Math.PI / 180)

      x2 = x1 + newSideA
      y2 = y1 > y2 ? (y1 - newSideB) : (y1 + newSideB)
    }

    graphic = new Line([x1, y1, x2, y2], {
      stroke: 'red'
    })
    canvas.add(graphic)
  }

  function drawEllipse ({ x: x1, y: y1 }: Pointer, e: any) {
    if (graphic) {
      canvas.remove(graphic)
      canvas.requestRenderAll()
    }

    const {
      pointer: {
        x: x2,
        y: y2
      },
      e: {
        shiftKey
      }
    } = e

    const left = Math.min(x1, x2)
    const top = Math.min(y1, y2)

    const rx = Math.abs(x1 - x2) / 2
    const ry = shiftKey ? rx : Math.abs(y1 - y2) / 2

    graphic = new Ellipse({
      left,
      top,
      rx,
      ry,
      fill: 'blue'
    })

    canvas.add(graphic)
  }

  function drawTextbox ({ x, y }: Pointer) {
    graphic = new Textbox('', {
      left: x,
      top: y
    })

    canvas.add(graphic)

    // 进入编辑模式
    ;(graphic as any).enterEditing()
  }

  function onFreeDrawingStart () {
    canvas.isDrawingMode = true
    const brush = canvas.freeDrawingBrush = new PencilBrush(canvas)
    brush.color = 'orange'
    brush.width = 1
  }

  function onFreeDrawingFinish () {
    // 取出画布中所有对象
    const objects = canvas.getObjects()
    const graphics = graphicsStore.graphics

    // 找到未被收集的 path 对象
    const orphan = objects.filter(object => !isMapperHasValue(graphics, object))

    orphan.forEach(item => {
      // 收集
      graphicsStore.addGraphic(item)
    })
  }
}
