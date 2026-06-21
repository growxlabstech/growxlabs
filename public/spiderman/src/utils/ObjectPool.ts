export class ObjectPool<T> {
  private pool: T[] = []
  private active: T[] = []
  private factory: () => T
  private reset: (obj: T) => void

  constructor(
    factory: () => T,
    reset: (obj: T) => void,
    initialSize: number
  ) {
    this.factory = factory
    this.reset = reset
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(factory())
    }
  }

  get(): T {
    let obj = this.pool.pop()
    if (!obj) obj = this.factory()
    this.reset(obj)
    this.active.push(obj)
    return obj
  }

  release(obj: T): void {
    const idx = this.active.indexOf(obj)
    if (idx !== -1) {
      this.active.splice(idx, 1)
      this.pool.push(obj)
    }
  }

  getActive(): T[] {
    return this.active
  }
}
