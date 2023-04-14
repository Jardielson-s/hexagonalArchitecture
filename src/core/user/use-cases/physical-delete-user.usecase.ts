import { UseCase } from '@src/shared/use-case.type'
import { Id, UserEntity, UserOutput } from '../entities/user.entity'
import { Dependencies } from '@src/shared/dependency.type'
import z from 'zod'

const Params = z.object({
	id: z.string().uuid(),
})
export type PhysicalDeleteUserByIdInput = z.infer<typeof Params>

const execute =
	({ Repositories }: Dependencies) =>
	async ({ id }: PhysicalDeleteUserByIdInput): Promise<UserOutput> => {
		Id.parse(id, {
			path: ['id'],
		})
		const deleteUser = await Repositories.userRepository.getById(id)
		if (!deleteUser) {
			throw new Error('userNotFound')
		}
		return await Repositories.userRepository.physicalDelete(id)
	}

export const PhysicalDeleteUserByIdUseCase: UseCase<
	Dependencies,
	PhysicalDeleteUserByIdInput,
	UserEntity
> = {
	execute,
}
