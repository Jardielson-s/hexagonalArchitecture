import z from 'zod'

export const Id = z.string().uuid().nullish()
const Name = z.string().min(1)
const Email = z.string().email({
	message: 'Email invalid format',
})
const Employee = z.array(z.record(z.any())).optional()
const CreatedAt = z.date().nullish()
const UpdatedAt = z.date().nullish()
const DeletedAt = z.date().nullish()

export const UserObject = z.object({
	id: Id,
	name: Name,
	email: Email,
	employees: Employee,
	createdAt: CreatedAt,
	updatedAt: UpdatedAt,
	deletedAt: DeletedAt,
})

export type UserType = z.infer<typeof UserObject>
export type UserOutput = UserEntity

export class UserEntity {
	id!: string
	name!: string
	email!: string
	employee?: Record<string, any>[]
	createdAt!: Date
	updatedAt!: Date
	deletedAt!: Date | null

	constructor(userDate: Pick<UserType, 'name'>) {
		Object.assign(this, UserObject.parse(userDate))
	}
}
