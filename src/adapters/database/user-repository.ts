import { UserEntity } from '@src/core/user/entities/user.entity'
import { prismaClient } from '@src/adapters/database/database.connection'
import { CreateUserInput } from '@src/core/user/use-cases/create-user.usecase'
import { UserRepository } from '@src/ports/infra/database/repositories/user.repository'

export const userRepository = <Input>(): UserRepository<Input> => ({
	async save(input: CreateUserInput): Promise<UserEntity> {
		const emailAlreadyExists = await prismaClient.user.findUnique({
			where: {
				email: input.email,
			},
		})

		if (emailAlreadyExists) {
			throw new Error('emailAlreadyExists')
		}

		const user = await prismaClient.user.create({
			data: { ...input } as CreateUserInput,
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
	async update(id: string, input: Input): Promise<UserEntity> {
		const user = await prismaClient.user.update({
			where: { id: id },
			data: { ...input } as UserEntity,
		})
		return new UserEntity(user)
	},
	async physicalDelete(id: string): Promise<UserEntity> {
		const user = await prismaClient.user.delete({ where: { id: id } })
		return new UserEntity(user)
	},
})
