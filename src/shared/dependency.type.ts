import { Repository } from './repository.base'

export type Dependencies<I, O> = {
	Repositories: Repository<I, O>
}
