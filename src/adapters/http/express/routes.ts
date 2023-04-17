import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { userRoutes } from '@src/ports/http/express/user.routes'
import { adapter } from '../config/adapter'
import { app } from './express'
import { healthCheckRoutes } from '@src/ports/http/express/routes'
import { options } from '@src/ports/http/express/swagger.config'

const specs = swaggerJSDoc(options)
const routes = app

routes.use('/doc', swaggerUi.serve, swaggerUi.setup(specs))
routes.get('/health-check', adapter(healthCheckRoutes.getHealthCheck))
routes.post('/user', adapter(userRoutes.post))
routes.patch('/user/:id', adapter(userRoutes.update))
routes.get('/user/:id', adapter(userRoutes.findUserById))
routes.delete('/user/:id', adapter(userRoutes.physicalDelete))
routes.get('/user', adapter(userRoutes.getUsers))

export { routes }
