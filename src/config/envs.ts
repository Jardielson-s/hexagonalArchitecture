const envs = (env: string): string | undefined => {
	if (process.env[env]) return process.env[env]
	throw new Error(`${env} not found`)
}

export default {
	PORT: envs('PORT'),
}
