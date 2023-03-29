export type UseCase<K = any, T = any, R = any> = {
	execute: (...dependencies: K[]) => (input: T) => Promise<R>
}
