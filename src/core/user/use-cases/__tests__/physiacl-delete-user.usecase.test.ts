import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { PhysicalDeleteUserByIdUseCase } from '../physical-delete-user.usecase'
import { stub } from './user-mock'

describe('FindUserById', () => {
	beforeEach(() => {
		vitest.clearAllMocks()
	})

	it('should be defined execute function', () => {
		expect(PhysicalDeleteUserByIdUseCase.execute).toBeDefined()
	})

	it('should be userNotFound error', async () => {
		await expect(
			PhysicalDeleteUserByIdUseCase.execute({
				Repositories: { userRepository: stub },
			})({
				id: '1239189f-e00d-4484-b408-a9f92a54e0ee',
			}),
		).to.rejects.toThrow('userNotFound')
	})

	it('should be execute function success', async () => {
		vitest.spyOn(stub, 'getById').mockResolvedValue({
			id: '1239189f-e00d-4484-b408-a9f92a54e0ee',
			name: 'Joe Doe',
			email: 'joe@gmail.com',
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		})

		vitest.spyOn(stub, 'physicalDelete').mockResolvedValue({
			id: '1239189f-e00d-4484-b408-a9f92a54e0ee',
			name: 'Joe Doe',
			email: 'joe@gmail.com',
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		})

		const response = await PhysicalDeleteUserByIdUseCase.execute({
			Repositories: { userRepository: stub },
		})({
			id: '1239189f-e00d-4484-b408-a9f92a54e0ee',
		})
		expect(response.id).toBeDefined()
		expect(response.name).toBeDefined()
		expect(response.createdAt).toBeDefined()
	})
})
