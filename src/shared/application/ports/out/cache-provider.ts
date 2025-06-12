export interface CacheProvider<T> {
    push(obj: T): Promise<void>
    get(id: string): Promise<T | null>
}
