import { UseCase } from '@src/shared/use-case.type'
import { UserEntity, UserObject, UserOutput } from '../entities/user.entity'
import { Dependencies } from '@src/shared/dependency.type'
import z from 'zod'

const ValidInput = UserObject.pick({
	name: true
})
export type UserInput = z.infer<typeof ValidInput>

const execute =
	({ Repositories }: Dependencies<UserInput,UserEntity>) =>
	async (input: UserInput): Promise<UserOutput> => {
		  const user = new UserEntity(input)
			return await Repositories.save(user)
	}

export const CreateUserUseCase: UseCase<
	Dependencies<UserInput, UserEntity>,
	UserInput,
	UserEntity
> = {
	execute,
}
