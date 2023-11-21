import type { UploadFile } from 'ant-design-vue'

export * from './style'

export type Id = string | number

export interface IdRecord<T extends Id = number> {
  id: T
}

export type ColorString = string

export interface LayerItem extends IdRecord {
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
}
