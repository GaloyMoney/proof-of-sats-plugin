/* eslint-disable  @typescript-eslint/no-non-null-assertion */

export const LRUCache = <T>(maxSize: number) => {
  const map: Map<string, T> = new Map<string, T>()
  const get = (key: string): T | undefined => {
    const hasKey = map.has(key)
    let value: T | undefined
    if (hasKey) {
      value = map.get(key)
      map.delete(key)
      map.set(key, value!)
    }
    return value
  }
  const put = (key: string, value: T): void => {
    if (map.size > maxSize) map.delete(map.keys().next().value())
    map.set(key, value)
  }
  return {
    get,
    put,
  }
}
