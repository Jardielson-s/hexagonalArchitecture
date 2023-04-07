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
}
