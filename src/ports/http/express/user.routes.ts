import { userRepository } from '@src/adapters/database/user-repository'
import {
	CreateUserUseCase,
	CreateUserInput,
} from '@src/core/user/use-cases/create-user.usecase'
import { selectFields } from '@src/utils/select-fields'

export const userRoutes = {
	post: CreateUserUseCase.execute({
		Repositories: {
			userRepository: userRepository<CreateUserInput>(),
		},
		Utils: {
			selectFields: selectFields,
		},
	}),
}
