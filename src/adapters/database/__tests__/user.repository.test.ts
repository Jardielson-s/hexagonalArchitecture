import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { userRepository } from '@src/adapters/database/user.repository'
import { stub } from '@src/adapters/database/__tests__/mock'

describe('UserRepsoitory', () => {
	beforeEach(() => {
		vitest.clearAllMocks()
	})

	it('should be defined', () => {
		expect(userRepository(stub)).toBeDefined()
	})

	it('should be defined save function', async () => {
		vitest.spyOn(stub.user, 'create').mockResolvedValue({
			id: '1239189f-e00d-4484-b408-a9f92a54e0ee',
			name: 'Joe Doe',
			email: 'joe@gmail.com',
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		})
		expect(
			await userRepository(stub).save({
				name: 'Test',
				email: 'test@gmail.com',
			}),
		).toBeDefined()
	})

	it('should be defined emailAlredyExists error', async () => {
		vitest.spyOn(stub.user, 'findUnique').mockResolvedValue({
			id: '1239189f-e00d-4484-b408-a9f92a54e0ee',
			name: 'Joe Doe',
			email: 'joe@gmail.com',
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		})
		await expect(
			userRepository(stub).save({ name: 'Test', email: 'test@gmail.com' }),
		).to.rejects.toThrow('emailAlreadyExists')
	})

	it('should be defined get function', async () => {
		vitest.spyOn(stub.user, 'findMany').mockResolvedValue([
			{
				id: '1239189f-e00d-4484-b408-a9f92a54e0ee',
				name: 'Joe Doe',
				email: 'joe@gmail.com',
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			},
		])
		expect(await userRepository(stub).get()).toBeDefined()
	})

	it('should be defined getById function', async () => {
		vitest.spyOn(stub.user, 'findUnique').mockResolvedValue({
			id: '1239189f-e00d-4484-b408-a9f92a54e0ee',
			name: 'Joe Doe',
			email: 'joe@gmail.com',
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		})
		expect(
			await userRepository(stub).getById(
				'1239189f-e00d-4484-b408-a9f92a54e0ee',
			),
		).toBeDefined()
	})

	it('should be defined userNotFound', async () => {
		vitest.spyOn(stub.user, 'findUnique').mockResolvedValue(null)
		expect(
			await userRepository(stub).getById(
				'1239189f-e00d-4484-b408-a9f92a54e0e2',
			),
		).toBeNull()
	})

	it('should be defined update function', async () => {
		vitest.spyOn(stub.user, 'update').mockResolvedValue({
			id: '1239189f-e00d-4484-b408-a9f92a54e0ee',
			name: 'test update',
			email: 'joe@gmail.com',
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		})
		const response = await userRepository(stub).update(
			'1239189f-e00d-4484-b408-a9f92a54e0ee',
			{ id: '', name: 'test update' },
		)
		expect(response.name).toBe('test update')
	})

	it('should be defined delete function', async () => {
		vitest.spyOn(stub.user, 'delete').mockResolvedValue({
			id: '1239189f-e00d-4484-b408-a9f92a54e0ee',
			name: 'test update',
			email: 'joe@gmail.com',
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		})
		const response = await userRepository(stub).physicalDelete(
			'1239189f-e00d-4484-b408-a9f92a54e0ee',
		)
		expect(response.id).toBeDefined()
		expect(response.name).toBeDefined()
	})

	it('should be defined findEmail function', async () => {
		vitest.spyOn(stub.user, 'findFirst').mockResolvedValue({
			id: '1239189f-e00d-4484-b408-a9f92a54e0ee',
			name: 'test update',
			email: 'joe@gmail.com',
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		})
		const response = await userRepository(stub).findEmail('joe@gmail.com')
		expect(response).toBe('joe@gmail.com')
	})

	it('should be defined findEmail function return null', async () => {
		vitest.spyOn(stub.user, 'findFirst').mockResolvedValue(null)
		expect(await userRepository(stub).findEmail('joe@gmail.com')).toBeNull()
	})
})
