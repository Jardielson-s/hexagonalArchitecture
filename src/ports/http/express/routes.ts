import { HeathCheckUseCase } from '@src/core/health-check/use-case/health-check.use-case'

export const healthCheckRoutes = {
	getHealthCheck: HeathCheckUseCase.execute(),
}
