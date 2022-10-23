import { HeathCheckUseCase } from '../../../core/use-case/health-check.use-case'
import { adapter } from '../config/adapter'
import { app } from './express'

const routes = app

routes.get('/health-check', adapter(HeathCheckUseCase))

export { routes }
