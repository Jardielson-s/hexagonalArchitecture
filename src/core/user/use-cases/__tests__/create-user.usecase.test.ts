import { describe, test, expect, vitest } from 'vitest'
import { CreateUserUseCase } from '../create-user.usecase'
import { Param, expectZodError, stub } from './user-mock'

describe('CreateUserUseCase', () => {
	test('should be defined execute method', () => {
		expect(CreateUserUseCase.execute).toBeDefined()
	})

	test('should be defined execute method successfully', async () => {
		const user = {
			id: 'any-id',
			name: 'Joe Doe',
			email: 'joeDoe@gmail.com',
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		}
		vitest.spyOn(stub, 'save').mockResolvedValue({
			...user,
		})

		const response = await CreateUserUseCase.execute({
			Repositories: {
				userRepository: stub,
			},
			Utils: null,
		})({
			name: user.name,
			email: user.email,
		})

		expect(response.name).toEqual(user.name)
		expect(response.createdAt).toBeDefined()
		expect(response.updatedAt).toBeDefined()
	})

	test('should be defined execute method error', async () => {
		await expectZodError(
			() =>
				CreateUserUseCase.execute({
					Repositories: {
						userRepository: stub,
					},
					Utils: null,
				})({
					name: '',
					email: '',
				}),
			(issue: Param[]) => {
				expect(issue).toStrictEqual([
					{
						message: 'String must contain at least 1 character(s)',
						path: 'name',
					},
					{
						message: 'Email invalid format',
						path: 'email',
					},
				])
			},
		)
	})
})
