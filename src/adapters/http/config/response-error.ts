import { ResponseError, messageError } from '@src/ports/http/express/responses'

export const responseError = (error: Error): ResponseError => {
	const key: string = error.message
	const responde = messageError[`${key}`]
	if (responde) {
		return responde
	}
	return {
		code: 500,
		message: 'Internal Server Error',
	}
}
