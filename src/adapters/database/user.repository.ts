import { UserEntity } from '@src/core/user/entities/user.entity'
import { prismaClient } from '@src/adapters/database/database.connection'
import { CreateUserInput } from '@src/core/user/use-cases/create-user.usecase'
import { UserRepository } from '@src/ports/infra/database/repositories/user.repository'
import { UpdateUserInput } from '@src/core/user/use-cases/update-user.usecase'

export const userRepository = (
	prisma: typeof prismaClient,
): UserRepository => ({
	async save(input: CreateUserInput): Promise<UserEntity> {
		const emailAlreadyExists = await prisma.user.findUnique({
			where: {
				email: input.email,
			},
		})

		if (emailAlreadyExists) {
			throw new Error('emailAlreadyExists')
		}

		const user = await prisma.user.create({
			data: { ...input } as CreateUserInput,
		})
		return new UserEntity(user)
	},
	async get({
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
	}): Promise<{
		page: number
		limit: number
		total: number
		results: UserEntity[]
	}> {
		const wheteImpl = search
			? {
					OR: [{ name: search }, { email: search }],
			  }
			: {}
		const [count, users] = await Promise.all([
			prisma.user.count(),
			prisma.user.findMany({
				orderBy: orderBy,
				skip: page,
				take: limit,
				where: wheteImpl,
				include: include,
			}),
		])
		const data = {
			page: page || 1,
			limit: limit || 10,
			total: count,
			results: users.map(
				(user) => new UserEntity(user as unknown as UserEntity),
			),
		}
		return data
	},
	async getById(id: string): Promise<UserEntity | null> {
		const user = await prisma.user.findUnique({ where: { id: id } })
		if (user) {
			return new UserEntity(user)
		}
		return null
	},
	async update(id: string, input: UpdateUserInput): Promise<UserEntity> {
		const user = await prisma.user.update({
			where: { id: id },
			data: { ...input } as UserEntity,
		})
		return new UserEntity(user)
	},
	async physicalDelete(id: string): Promise<UserEntity> {
		const user = await prisma.user.delete({ where: { id: id } })
		return new UserEntity(user)
	},
	async findEmail(email: string): Promise<string | null> {
		const findEmail = await prisma.user.findFirst({
			where: {
				email: email,
			},
			select: {
				email: true,
			},
		})
		return findEmail?.email || null
	},
})
