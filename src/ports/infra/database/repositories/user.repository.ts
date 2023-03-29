import { UserEntity } from '@src/core/user/entities/user.entity'
import { Repository } from '@src/shared/repository.base'
import { prismaClient } from '../database.connection'
import { UserInput } from '@src/core/user/use-cases/create-user.usecase'

export const UserRepository = <Input>(): Repository<Input, UserEntity> => ({
	async save(input: Input): Promise<UserEntity> {
		const user = await prismaClient.user.create({
			data: { ...input } as UserInput,
		})
		return new UserEntity(user)
	},
	async get(): Promise<UserEntity[]> {
		const users = await prismaClient.user.findMany()
		return users.map((user) => new UserEntity(user))
	},
	async getById(id: string): Promise<UserEntity | null> {
		const user = await prismaClient.user.findUnique({ where: { id: id } })
		if (user) {
			return new UserEntity(user)
		}
		return null
	},
	async update(id: string, input: UserEntity): Promise<UserEntity> {
		const user = await prismaClient.user.update({
			where: { id: id },
			data: { ...input },
		})
		return new UserEntity(user)
	},
	async physicalDelete(id: string): Promise<UserEntity> {
		const user = await prismaClient.user.delete({ where: { id: id } })
		return new UserEntity(user)
	},
})
