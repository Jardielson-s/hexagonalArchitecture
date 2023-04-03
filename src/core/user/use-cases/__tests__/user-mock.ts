import { UserInput } from '@src/core/user/use-cases/create-user.usecase'
import { UserRepository } from '@src/ports/infra/database/repositories/user.repository'
import { vitest } from 'vitest'
import z from 'zod'

export const stub = {
	save: vitest.fn(),
} as unknown as UserRepository<UserInput>

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
