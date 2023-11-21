/* eslint-disable no-unused-vars */

export const tools = [
  [
    { label: '选择', value: 'move', icon: 'icon-select' }
  ],
  [
    { label: '直线', value: 'line', icon: 'icon-line' },
    { label: '矩形', value: 'square', icon: 'icon-square' },
    { label: '椭圆', value: 'ellipse', icon: 'icon-ellipse' }
  ],
  [
    { label: '文本框', value: 'text', icon: 'icon-text' },
    { label: '铅笔', value: 'pencil', icon: 'icon-pencil' },
    { label: '橡皮擦', value: 'eraser', icon: 'icon-eraser' }
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
