import { routes } from '@src/adapters/http/express/routes'
import envs from './config/envs'

const server = routes

server.listen(envs.PORT, () => {
	console.log(`SERVER RUNING IN PORT: ${envs.PORT}`)
})
