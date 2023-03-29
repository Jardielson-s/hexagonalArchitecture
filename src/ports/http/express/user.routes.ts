import {
	CreateUserUseCase,
	UserInput,
} from '@src/core/user/use-cases/create-user.usecase'
import { UserRepository } from '@src/ports/infra/database/repositories/user.repository'

export const userRoutes = {
	post: CreateUserUseCase.execute({
		Repositories: UserRepository<UserInput>(),
	}),
}
