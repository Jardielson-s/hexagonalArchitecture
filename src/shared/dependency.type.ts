import { UserRepository } from '@src/ports/infra/database/repositories/user.repository'
import { selectFields } from '@src/utils/select-fields'

export type Dependencies<I> = {
	Repositories: {
		userRepository: UserRepository<I>
	}
	Utils: {
		selectFields: typeof selectFields
	} | null
}
