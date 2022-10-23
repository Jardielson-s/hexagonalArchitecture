export type UseCase<T = any, K = any> = {
    execute: (...args: T[]) => Promise<K>
}
