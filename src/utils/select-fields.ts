type FunctionInput = Record<string, unknown>[] | Record<string, any>
type FunctionOutput = Record<string, unknown>[] | Record<string, unknown>

export const selectFields = (
	array: FunctionInput,
	fields: string[],
): FunctionOutput => {
	if (Array.isArray(array)) {
		return array.map((element) => {
			const obj: Record<string, unknown> = {}
			fields.map((field) => {
				obj[`${field}`] = element[`${field}`]
			})
			return obj
		})
	} else {
		const obj: Record<string, unknown> = {}
		fields.map((field) => {
			obj[`${field}`] = array[`${field}`] || null
		})
		return obj
	}
}
