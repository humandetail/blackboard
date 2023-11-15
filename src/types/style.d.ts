import { Align } from '@/definitions'

export type BorderStyle = 'solid' | 'dash'

export interface AlignButton {
  name: string
  value: Align,
  icon: string
  disabled?: boolean
}
