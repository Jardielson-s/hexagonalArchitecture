import { UserRepository } from '@src/ports/infra/database/repositories/user.repository'
import { vitest } from 'vitest'
import z from 'zod'

export const stub = {
	save: vitest.fn(),
	getById: vitest.fn(),
	update: vitest.fn(),
	findEmail: vitest.fn(),
	physicalDelete: vitest.fn(),
	get: vitest.fn(),
} as unknown as UserRepository

export type Param = { message: string; path: string | number | undefined }
export type ZOdErrorInput = {
	(param: Param[]): void
}

export const expectZodError = async (
	fn: () => Promise<unknown>,
	expect: ZOdErrorInput,
) => {
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
