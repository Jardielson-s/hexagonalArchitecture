import { UseCase } from '@src/shared/use-case.type'
import { UserEntity } from '../entities/user.entity'
import { Dependencies } from '@src/shared/dependency.type'
import { z } from 'zod'

const Query = z.object({
	orderBy: z
		.string()
		.optional()
		.transform((val) => {
			const values = val?.split(':')
			return values ? { [`${values[0]}`]: values[1] } : {}
		}),
	search: z.string().optional(),
	include: z.record(z.any()).optional().default({ employees: true }),
	page: z
		.string()
		.optional()
		.transform((val) => (val ? parseInt(val) : 1))
		.refine((val) => val !== 0, { message: 'page not is zero' }),
	limit: z
		.string()
		.optional()
		.transform((val) => (val ? parseInt(val) : 10))
		.refine((val) => val !== 0, { message: 'limit not is zero' }),
})
const execute =
	({ Repositories }: Dependencies) =>
	async ({
		...params
	}: {
		orderBy?: string
		skip?: number
		take?: number
		search?: string
		include?: Record<string, unknown>
	}): Promise<{
		page: number
		limit: number
		total: number
		results: UserEntity[]
	}> => {
		const query = Query.parse(params)
		const users = await Repositories.userRepository.get({
			orderBy: query.orderBy,
			page: (query.page - 1) * query.limit,
			limit: query.limit * query.page,
			search: query.search,
			include: query.include,
		})
		return users
	}

export const GetUsersUseCase: UseCase<
	Dependencies,
	{
		orderBy?: string
		page?: string
		limit?: string
		search?: string
		include?: Record<string, unknown>
	},
	{ page: number; limit: number; total: number; results: UserEntity[] }
> = {
	execute,
}
