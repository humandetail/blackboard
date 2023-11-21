import createId from './createId'

export const isArray = <T = unknown>(val: unknown): val is Array<T> => Array.isArray(val)

export {
  createId
}
