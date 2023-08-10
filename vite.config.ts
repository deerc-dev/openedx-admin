import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import { swcReactRefresh } from 'vite-plugin-swc-react-refresh'

export default defineConfig(({ command }) => ({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	css: {
		devSourcemap: true
	},
	plugins: [(command === 'serve' ? swcReactRefresh : react)(), visualizer()]
}))
