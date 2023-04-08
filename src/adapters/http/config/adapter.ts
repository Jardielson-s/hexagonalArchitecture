import { Request, Response } from 'express'

import { Controller } from '@src/shared/controller.type'
import { z } from 'zod'
import { responseError } from './response-error'

export const adapter = (controller: Controller) => {
	return async (req: Request, res: Response): Promise<Response> => {
		const request = {
			...req.body,
			...req.query,
		}
		try {
			const response = await controller(request)
			return res.status(200).json(response)
		} catch (err: unknown) {
			if (err instanceof z.ZodError) {
				const error = err.issues.map((issue) => {
					return {
						field: issue.path[0],
						message: issue.message,
					}
				})
				return res.status(400).json({ error: error })
			}
			const error = responseError(err as Error)
			return res.status(error.code).json({ message: error.message })
		}
	}
}
