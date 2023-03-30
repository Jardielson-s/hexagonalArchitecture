import { describe, test, expect, vitest } from 'vitest'
import { CreateUserUseCase } from '../create-user.usecase'
import { expectZodError, stub } from './user-mock'
import { z } from 'zod'


describe('CreateUserUseCase', () => {
	test('should be defined execute method', () => {
		expect(CreateUserUseCase.execute).toBeDefined()
	})

	test('should be defined execute method successfully', async () => {
		const user = {
			id: 'any-id',
			name: 'Joe Doe',
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
		})({
			name: user.name,
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
				})({
					name: '',
				}),
			(issue: z.ZodIssue[]) => {
				expect(issue).toStrictEqual([
					{
						message: 'String must contain at least 1 character(s)',
						path: 'name',
					},
				])
			},
		)
	})
})
