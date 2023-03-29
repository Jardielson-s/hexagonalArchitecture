import { UseCase } from '@src/shared/use-case.type'

const execute = () => async (): Promise<string> => {
	return 'HEALTH CHECK OK'
}
export const HeathCheckUseCase: UseCase<void, void, string> = {
	execute,
}
