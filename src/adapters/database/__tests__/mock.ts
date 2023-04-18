import { PrismaClient } from '@prisma/client'
import { vitest } from 'vitest'

export const stub = {
	user: {
		findUnique: vitest.fn(),
		create: vitest.fn(),
		findMany: vitest.fn(),
		update: vitest.fn(),
		delete: vitest.fn(),
		findFirst: vitest.fn(),
		count: vitest.fn(),
	},
} as unknown as PrismaClient
