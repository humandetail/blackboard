/* eslint-disable no-unused-vars */

import { ToolItem } from '@/types'

export enum ToolType {
  select,
  line,
  square,
  ellipse,
  text,
  pencil,
  eraser
}

export const tools: ToolItem[][] = [
  [
    { label: '选择', value: ToolType.select, icon: 'icon-select', cursor: 'default' }
  ],
  [
    { label: '直线', value: ToolType.line, icon: 'icon-line', cursor: 'crosshair' },
    { label: '矩形', value: ToolType.square, icon: 'icon-square', cursor: 'crosshair' },
    { label: '椭圆', value: ToolType.ellipse, icon: 'icon-ellipse', cursor: 'crosshair' }
  ],
  [
    { label: '文本框', value: ToolType.text, icon: 'icon-text', cursor: 'crosshair' },
    { label: '铅笔', value: ToolType.pencil, icon: 'icon-pencil', cursor: 'crosshair' },
    { label: '橡皮擦', value: ToolType.eraser, icon: 'icon-eraser', cursor: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAANxJREFUOE9jZKAyYKSyeQzDw8BwBgYGDWjQ3GBgYFiJL5jweTmCm5t7qoqKCquxsTEvyJCzZ89+vnPnzu+vX79mMzAwrMBmMC4DI9TV1bvLyspkkpKSUPTNmzePoaur68nNmzdLsRmK1UBubu63kyZNEkI3DGYyyNC8vLx3X79+FUZ3JTYDw/X19WdfuHAB7E1cwMDA4PPFixdT0cMUm4H1SUlJDXPnzsWbRJOTkxnmzZvXwMDA0IiskC4GUt3LDNSOFFCQUDfZQAOZqgkbOeKolvXIKtmGR/FFktcB1P1uFYSShpoAAAAASUVORK5CYII=") 10 10, auto' }
  ]
]

export const colors = [
  { label: '透明', value: 'transparent' },
  { label: '薄暮', value: '#f5222d' },
  { label: '火山', value: '#fa541c' },
  { label: '日暮', value: '#fa8c16' },
  { label: '金盏花', value: '#faad14' },
  { label: '黑色', value: '#000000' },
  { label: '日出', value: '#fadb14' },
  { label: '青柠', value: '#a0d911' },
  { label: '极光绿', value: '#52c41a' },
  { label: '明青', value: '#13c2c2' },
  { label: '白色', value: '#ffffff' },
  { label: '拂晓蓝', value: '#1677ff' },
  { label: '极客蓝', value: '#2f54eb' },
  { label: '酱紫', value: '#722ed1' },
  { label: '法式洋红', value: '#eb2f96' }
]

export enum Align {
  alignLeft,
  horizontalAlignCenter,
  alignRight,
  horizontalUniformlySpaced,
  alignTop,
  verticalAlignCenter,
  alignBottom,
  verticalUniformlySpaced
}

export enum Rotate {
  left,
  right,
  flipHorizontal,
  flipVertical
}

export enum ShapeType {
  Rect,
  Circle,
  Line,
  Textbox
}
