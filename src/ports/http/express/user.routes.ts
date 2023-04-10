import { userRepository } from '@src/adapters/database/user-repository'
import { CreateUserUseCase } from '@src/core/user/use-cases/create-user.usecase'
import { UpdateUserUseCase } from '@src/core/user/use-cases/update-user.usecase'
import { selectFields } from '@src/utils/select-fields'

const Dependencies = {
	Repositories: {
		userRepository: userRepository(),
	},
	Utils: {
		selectFields: selectFields,
	},
}

export const userRoutes = {
	post: CreateUserUseCase.execute({
		...Dependencies,
	}),
	update: UpdateUserUseCase.execute({
		...Dependencies,
	}),
}
