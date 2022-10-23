import { describe, expect, it } from 'vitest'
import { HeathCheckUseCase } from './health-check.use-case'

describe('HealthCheckUseCase', () => {
    it('should be defined', () => {
        expect(HeathCheckUseCase).toBeDefined()
    })

    it('should be defined execute method', () => {
        expect(HeathCheckUseCase.execute).toBeDefined()
    })

    it('should able execute with sucess', async () => {
        const response = await HeathCheckUseCase.execute()
        expect(response).toBeDefined()
    })
})
