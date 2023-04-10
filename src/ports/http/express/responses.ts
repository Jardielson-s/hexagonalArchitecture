export type ResponseError = {
	code: number
	message: string
}
export type ResponseErrorType = Record<string, ResponseError>

export const messageError: ResponseErrorType = {
	emailAlreadyExists: {
		code: 400,
		message: 'User email already exists',
	},
	userEmailAlreadyExists: {
		code: 400,
		message: 'User email already exists',
	},
	userNotFound: {
		code: 404,
		message: 'User not found',
	},
}
