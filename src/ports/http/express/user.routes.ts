import { prismaClient } from '@src/adapters/database/database.connection'
import { userRepository } from '@src/adapters/database/user.repository'
import { CreateUserUseCase } from '@src/core/user/use-cases/create-user.usecase'
import { FindUserByIdUseCase } from '@src/core/user/use-cases/find-user-by-id.usecase'
import { UpdateUserUseCase } from '@src/core/user/use-cases/update-user.usecase'

const Dependencies = {
	Repositories: {
		userRepository: userRepository(prismaClient),
	},
}

export const userRoutes = {
	post: CreateUserUseCase.execute({
		...Dependencies,
	}),
	update: UpdateUserUseCase.execute({
		...Dependencies,
	}),
	findUserById: FindUserByIdUseCase.execute({
		...Dependencies,
	}),
}
