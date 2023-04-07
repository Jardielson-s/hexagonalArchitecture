import { UserEntity } from '@src/core/user/entities/user.entity'
import { CreateUserInput } from '@src/core/user/use-cases/create-user.usecase'

export type UserRepository<I> = {
	save: (input: CreateUserInput) => Promise<UserEntity>
	get: () => Promise<UserEntity[] | []>
	getById: (id: string) => Promise<UserEntity | null>
	update: (id: string, input: I) => Promise<UserEntity>
	physicalDelete: (id: string) => Promise<UserEntity>
}
