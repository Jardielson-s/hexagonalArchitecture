import { UserEntity } from '@src/core/user/entities/user.entity'

export type UserRepository<I> = {
	save: (input: I) => Promise<UserEntity>
	get: () => Promise<UserEntity[] | []>
	getById: (id: string) => Promise<UserEntity | null>
	update: (id: string, input: I) => Promise<UserEntity>
	physicalDelete: (id: string) => Promise<UserEntity>
}
