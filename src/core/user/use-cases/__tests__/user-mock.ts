import { UserInput } from '@src/core/user/use-cases/create-user.usecase'
import { UserRepository } from '@src/ports/infra/database/repositories/user.repository'
import { vitest } from 'vitest'
import z from 'zod'

export const stub = {
	save: vitest.fn(),
} as unknown as UserRepository<UserInput>

// eslint-disable-next-line @typescript-eslint/ban-types
export const expectZodError = async (fn: Function, expect: Function) => {
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