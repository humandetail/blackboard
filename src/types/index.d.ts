import { ToolType } from '@/definitions'
import type { UploadFile } from 'ant-design-vue'

export * from './style'

export type Id = string | number

export interface IdRecord<T extends Id = number> {
  id: T
}

export type ColorString = string

export interface LayerItem extends IdRecord {
  title: string
  background: ColorString
  graphics: Set<Id>
  visible: boolean
  opacity: number
}

export interface FrameItem extends IdRecord {
  delay: number
  layers: Set<Id>
}

export interface Settings {
  launch: boolean
  width: number
  height: number
  sourceFile?: UploadFile
  readonly PIXEL_RATIO: number
}

export interface ToolItem {
  label: string
  value: ToolType
  icon: string
  cursor: string
}

export interface Pointer {
  x: number
  y: number
}
