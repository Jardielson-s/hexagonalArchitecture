import { describe, test, expect, vitest } from 'vitest'
import { CreateUserUseCase, UserInput } from './create-user.usecase'
import { Repository } from '@src/shared/repository.base'
import { UserEntity } from '../entities/user.entity'
import z from 'zod'

const stub = {
	save: vitest.fn(),
} as unknown as Repository<UserInput, UserEntity>

// eslint-disable-next-line @typescript-eslint/ban-types
const expectZodError = async (fn: Function, expect: Function) => {
	try {
		await fn()
	} catch (err) {
    const error = err as z.ZodError
			expect(
				error.issues.map(({ message, path }: z.ZodIssue) => ({
					message,
					path: path[0],
				})),
			)
	}
}
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

		const response = await CreateUserUseCase.execute({ Repositories: stub })({
			name: user.name,
		})

		expect(response.name).toEqual(user.name)
		expect(response.createdAt).toBeDefined()
		expect(response.updatedAt).toBeDefined()
	})

	test('should be defined execute method error', async () => {
		await expectZodError(
			() =>
				CreateUserUseCase.execute({ Repositories: stub })({
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
