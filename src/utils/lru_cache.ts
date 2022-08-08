/* eslint-disable  @typescript-eslint/no-non-null-assertion */
export class LRUCache<T> {
  private map: Map<string, T> = new Map<string, T>()
  private maxSize: number
  constructor(maxSize: number) {
    this.maxSize = maxSize
  }
  public get(key: string) {
    const hasKey = this.map.has(key)
    let value: T | undefined
    if (hasKey) {
      value = this.map.get(key)
      this.map.delete(key)
      this.map.set(key, value!)
    }
    return value ? value : null
  }
  public put(key: string, value: T) {
    if (this.map.size > this.maxSize) {
      this.map.delete(this.map.keys().next().value)
    }
    this.map.set(key, value)
  }
}
