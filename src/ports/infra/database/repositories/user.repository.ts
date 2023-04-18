import { UserEntity } from '@src/core/user/entities/user.entity'
import { CreateUserInput } from '@src/core/user/use-cases/create-user.usecase'
import { UpdateUserInput } from '@src/core/user/use-cases/update-user.usecase'

export type UserRepository = {
	save: (input: CreateUserInput) => Promise<UserEntity>
	get: ({
		orderBy,
		page,
		limit,
		search,
		include,
	}: {
		orderBy?: Record<string, unknown>
		page?: number
		limit?: number
		search?: string
		include?: Record<string, unknown>
	}) => Promise<{
		page: number
		limit: number
		total: number
		results: UserEntity[]
	}>
	getById: (id: string) => Promise<UserEntity | null>
	update: (id: string, input: UpdateUserInput) => Promise<UserEntity>
	physicalDelete: (id: string) => Promise<UserEntity>
	findEmail: (email: string) => Promise<string | null>
}
