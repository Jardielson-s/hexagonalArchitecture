import z from 'zod'

const Id = z.string().uuid().nullish()
const Name = z.string().min(1)
const Employee = z.array(z.string()).optional()
const CreatedAt = z.date().nullish()
const UpdatedAt = z.date().nullish()
const DeletedAt = z.date().nullish()

export const UserObject = z.object({
	id: Id,
	name: Name,
	employee: Employee,
	createdAt: CreatedAt,
	updatedAt: UpdatedAt,
	deletedAt: DeletedAt,
})

export type UserType = z.infer<typeof UserObject>
export type UserOutput = UserEntity

export class UserEntity {
	id!: string
	name!: string
	employee?: string[]
	createdAt!: Date
	updatedAt!: Date
	deletedAt!: Date | null

	constructor(userDate: Pick<UserType, 'name'>) {
		Object.assign(this, UserObject.parse(userDate))
	}
}
