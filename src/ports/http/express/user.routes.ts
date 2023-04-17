import { prismaClient } from '@src/adapters/database/database.connection'
import { userRepository } from '@src/adapters/database/user.repository'
import { CreateUserUseCase } from '@src/core/user/use-cases/create-user.usecase'
import { FindUserByIdUseCase } from '@src/core/user/use-cases/find-user-by-id.usecase'
import { GetUsersUseCase } from '@src/core/user/use-cases/get-users.usecase'
import { PhysicalDeleteUserByIdUseCase } from '@src/core/user/use-cases/physical-delete-user.usecase'
import { UpdateUserUseCase } from '@src/core/user/use-cases/update-user.usecase'

const Dependencies = {
	Repositories: {
		userRepository: userRepository(prismaClient),
	}
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
	physicalDelete: PhysicalDeleteUserByIdUseCase.execute({
		...Dependencies,
	}),
	getUsers: GetUsersUseCase.execute({
		...Dependencies,
	}),
}
