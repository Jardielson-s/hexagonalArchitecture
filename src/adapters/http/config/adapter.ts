import { Request, Response } from 'express'

import { UseCase } from '../../../shared/use-case.type'

export const adapter = (useCase: UseCase) => {
    return async (req: Request, res: Response): Promise<any> => {
        const request = {
            ...req,
        }
        try {
            const response = await useCase.execute(request)
            res.status(200).json(response)
        } catch (error: any) {
            res.status(500).json(error.message)
        }
    }
}
