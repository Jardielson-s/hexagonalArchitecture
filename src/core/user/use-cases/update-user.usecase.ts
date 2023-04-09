import { UseCase } from '@src/shared/use-case.type'
import { Id, UserEntity, UserObject, UserOutput } from '../entities/user.entity'
import { Dependencies } from '@src/shared/dependency.type'
import z from 'zod'

const ValidInput = UserObject.pick({
	name: true,
	email: true,
})
const Params = z.object({
	id: z.string().uuid(),
})
export type UpdateUserInput = Partial<z.infer<typeof ValidInput>> &
	z.infer<typeof Params>

const execute =
	({ Repositories }: Dependencies) =>
	async ({ id, ...input }: UpdateUserInput): Promise<UserOutput> => {
		Id.parse(id, {
			path: ['id'],
		})
		const findUser = await Repositories.userRepository.getById(id)
		const findEmail = await Repositories.userRepository.findEmail(
			input.email as string,
		)

		if (!findUser) {
			throw new Error('userNotFound')
		}

		if (findEmail) {
			throw new Error('userEmailAlreadyExists')
		}

		const userParseValue = {
			...findUser,
			...input,
			updatedAt: new Date(),
		}
		const user = new UserEntity(userParseValue)
		return await Repositories.userRepository.update(id, user)
	}

export const UpdateUserUseCase: UseCase<
	Dependencies,
	UpdateUserInput,
	UserEntity
> = {
	execute,
}
