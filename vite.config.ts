import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	test: {
		coverage: {
			include: ['**/src/core/**/*.ts'],
		},
		include: ['**/src/core/**/*.test.ts'],
	},
})
