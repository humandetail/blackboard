export interface IdRecord<T extends string | number = number> {
  id: T
}

export interface LayerItem extends IdRecord {
  title: string
  visible: boolean
  data: null
}

export interface FrameItem extends IdRecord {
  data: null
  delay: number
}
