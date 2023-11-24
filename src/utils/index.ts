import { Pointer } from '@/types'
import createId from './createId'

export const isArray = <T = unknown>(val: unknown): val is Array<T> => Array.isArray(val)

/**
 * 求两个点形成的夹角
 *
 * 取点 A 沿 x 轴上的任意一点 C
 * 获取 ∠CAB 的值
 *
 * @param A - 点 A
 * @param B - 点 B
 */
export const calculateAngle = (A: Pointer, B: Pointer) => {
  const { x: x1, y: y1 } = A
  const { x: x2, y: y2 } = B

  // 点 C
  const x3 = x1 + 1
  const y3 = y1

  // 计算向量 BA 和向量 CA 的点乘
  const dotProduct = (x1 - x2) * (x3 - x1) + (y1 - y2) * (y3 - y1)

  // 计算向量 BA 和向量 CA 的模
  const magnitudeBA = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  const magnitudeCA = Math.sqrt((x3 - x1) * (x3 - x1) + (y3 - y1) * (y3 - y1))

  // 计算向量 BA 和向量 CA 之间的夹角
  const angleInRadians = Math.acos(dotProduct / (magnitudeBA * magnitudeCA))

  // 计算 B 和 C 之间的夹角
  const angle = 180 - angleInRadians * (180 / Math.PI)

  return Number.isNaN(angle) ? 0 : angle
}

export const isMapperHasValue = <T = any>(mapper: Map<any, T>, value: T): boolean => {
  return Array.from(mapper).some(([, v]) => (v as any).graphicId === (value as any).graphicId)
}

export {
  createId
}
