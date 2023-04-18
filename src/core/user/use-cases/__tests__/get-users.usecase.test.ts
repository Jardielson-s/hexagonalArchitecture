import { beforeEach, describe, expect, it, vitest } from 'vitest'
import { GetUsersUseCase } from '../get-users.usecase'
import { stub } from './user-mock'

describe('GetUsers', () => {
	beforeEach(() => {
		vitest.clearAllMocks()
	})

	it('should be defined execute function', () => {
		expect(GetUsersUseCase.execute).toBeDefined()
	})

	it('should be execute function success', async () => {
		vitest.spyOn(stub, 'get').mockResolvedValue({
			page: 1,
			limit: 10,
			total: 1,
			results: [
				{
					id: '1239189f-e00d-4484-b408-a9f92a54e0ee',
					name: 'Joe Doe',
					email: 'joe@gmail.com',
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
				},
			],
		})
		const response = await GetUsersUseCase.execute({
			Repositories: { userRepository: stub },
		})({})

		expect(response).toBeDefined()
	})

	it('should be execute function with query', async () => {
		vitest.spyOn(stub, 'get').mockResolvedValue({
			page: 1,
			limit: 10,
			total: 1,
			results: [
				{
					id: '1239189f-e00d-4484-b408-a9f92a54e0ee',
					name: 'Joe Doe',
					email: 'joe@gmail.com',
					createdAt: new Date(),
					updatedAt: new Date(),
					deletedAt: null,
				},
			],
		})
		const response = await GetUsersUseCase.execute({
			Repositories: { userRepository: stub },
		})({
			orderBy: 'name:search',
			search: 'Joe Doe',
			page: '1',
			limit: '10',
		})

		expect(response).toBeDefined()
	})
})
