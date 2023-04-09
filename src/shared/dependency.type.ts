import { UserRepository } from '@src/ports/infra/database/repositories/user.repository'
import { selectFields } from '@src/utils/select-fields'

export type Dependencies = {
	Repositories: {
		userRepository: UserRepository
	}
	Utils: {
		selectFields: typeof selectFields
	} | null
}
