import { routes } from './adapters/http/express/routes'
import envs from './config/envs'

const server = routes

server.listen(envs.EXPRESS_PORT, () => {
    console.log(`SERVER RUNING IN PORT: 8080`)
})
