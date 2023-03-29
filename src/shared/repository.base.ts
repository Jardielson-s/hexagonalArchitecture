export type Repository<Input, Output> = {
	save: (input: Input) => Promise<Output>
	get: () => Promise<Output[]>
	getById: (id: string) => Promise<Output | null>
	update: (id: string, input: Output) => Promise<Output>
	physicalDelete: (id: string) => Promise<Output>
}
