import { defineConfig } from 'vitest/config'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	test: {
		coverage: {
			include: ['**/src/core/**/*.ts', '**/src/adapters/**/*.repository.ts'],
			all: true,
		},
		include: ['**/src/core/**/*.test.ts', '**/src/adapters/**/*.test.ts'],
	},
})
