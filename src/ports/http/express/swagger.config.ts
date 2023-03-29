import envs from '@src/config/envs'

export const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Library API',
			version: '1.0.0',
			description: 'A simple express libary API',
		},
		servers: [
			{
				url: `http://localhost:${envs.PORT}`,
			},
		],
	},
	apis: [`${__dirname}/*.swagger.+(ts|js)`],
}
