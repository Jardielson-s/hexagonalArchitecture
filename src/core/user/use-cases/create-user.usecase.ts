import { UseCase } from '@src/shared/use-case.type'
import { UserEntity, UserObject, UserOutput } from '../entities/user.entity'
import { Dependencies } from '@src/shared/dependency.type'
import z from 'zod'

const ValidInput = UserObject.pick({
	name: true,
	email: true,
})

export type CreateUserInput = z.infer<typeof ValidInput>

const execute =
	({ Repositories }: Dependencies) =>
	async (input: CreateUserInput): Promise<UserOutput> => {
		const user = new UserEntity(input)
		return await Repositories.userRepository.save(user)
	}

export const CreateUserUseCase: UseCase<
	Dependencies,
	CreateUserInput,
	UserEntity
> = {
	execute,
}
