import { UseCase } from '@src/shared/use-case.type'
import { Id, UserEntity, UserOutput } from '../entities/user.entity'
import { Dependencies } from '@src/shared/dependency.type'
import z from 'zod'

const Params = z.object({
	id: z.string().uuid(),
})
export type FindUserByIdInput = z.infer<typeof Params>

const execute =
	({ Repositories }: Dependencies) =>
	async ({ id }: FindUserByIdInput): Promise<UserOutput> => {
		Id.parse(id, {
			path: ['id'],
		})
		const findUser = await Repositories.userRepository.getById(id)
		if (!findUser) {
			throw new Error('userNotFound')
		}
		return findUser
	}

export const FindUserByIdUseCase: UseCase<
	Dependencies,
	FindUserByIdInput,
	UserEntity
> = {
	execute,
}
