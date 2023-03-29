import { userRoutes } from '@src/ports/http/express/user.routes'
import { adapter } from '../config/adapter'
import { app } from './express'
import { healthCheckRoutes } from '@src/ports/http/express/routes'

const routes = app

routes.get('/health-check', adapter(healthCheckRoutes.getHealthCheck))
routes.post('/user', adapter(userRoutes.post))
export { routes }
