import { Request, Response } from 'express'

import { Controller } from '@src/shared/controller.type'
import { z } from 'zod'

export const adapter = (controller: Controller) => {
	return async (req: Request, res: Response): Promise<Response> => {
		const request = {
			...req.body,
			...req.query,
		}
		try {
			const response = await controller(request)
			return res.status(200).json(response)
		} catch (error: any) {
			if(error instanceof z.ZodError){
				return res.status(400).json(error)
			}
			return res.status(500).json(error)
		}
	}
}
