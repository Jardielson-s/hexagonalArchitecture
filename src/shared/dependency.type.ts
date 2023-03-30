import { UserRepository } from '@src/ports/infra/database/repositories/user.repository'

export type Dependencies<I> = {
	Repositories: {
		userRepository: UserRepository<I>
	}
}
