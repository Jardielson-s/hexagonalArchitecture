import { describe, test, expect, vitest, beforeEach } from 'vitest'
import { UpdateUserUseCase } from '../update-user.usecase'
import { Param, expectZodError, stub } from './user-mock'

describe('UpdateUserUseCase', () => {
	beforeEach(() => {
		vitest.resetAllMocks()
	})
	test('should be defined execute method', () => {
		expect(UpdateUserUseCase.execute).toBeDefined()
	})

	test('should be defined execute method successfully', async () => {
		const user = {
			id: '2f976769-fb80-4ea8-9249-8f49ea259a76',
			name: 'Joe Doe',
			email: 'joeDoe@gmail.com',
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		}
		vitest.spyOn(stub, 'getById').mockResolvedValue({
			...user,
		})

		vitest.spyOn(stub, 'update').mockResolvedValue({
			...user,
			name: 'Test update',
		})

		const response = await UpdateUserUseCase.execute({
			Repositories: {
				userRepository: stub,
			},
		})({
			id: '2f976769-fb80-4ea8-9249-8f49ea259a76',
			name: 'Test update',
		})

		expect(response.name).toEqual('Test update')
		expect(response.createdAt).toBeDefined()
		expect(response.updatedAt).toBeDefined()
	})

	test('should be defined execute method error', async () => {
		await expectZodError(
			() =>
				UpdateUserUseCase.execute({
					Repositories: {
						userRepository: stub,
					},
				})({
					id: '',
					name: '',
					email: '',
				}),
			(issue: Param[]) => {
				expect(issue).toStrictEqual([
					{
						message: 'Invalid uuid',
						path: 'id',
					},
				])
			},
		)
	})

	test('should be id not found error', async () => {
		await expect(
			UpdateUserUseCase.execute({
				Repositories: {
					userRepository: stub,
				},
			})({
				id: '2f976769-fb80-4ea8-9249-8f49ea259a71',
				name: 'Test update',
			}),
		).to.rejects.toThrow('userNotFound')
	})

	test('should be user email already exists error', async () => {
		const user = {
			id: '2f976769-fb80-4ea8-9249-8f49ea259a76',
			name: 'Joe Doe',
			email: 'joeDoe@gmail.com',
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		}
		vitest.spyOn(stub, 'getById').mockResolvedValue({
			...user,
		})

		vitest.spyOn(stub, 'findEmail').mockResolvedValue(user.email)

		await expect(
			UpdateUserUseCase.execute({
				Repositories: {
					userRepository: stub,
				},
			})({
				id: user.id,
				name: 'Test update',
				email: user.email,
			}),
		).to.rejects.toThrow('userEmailAlreadyExists')
	})
})
