/* eslint-env node */
module.exports = {
	env: {
		browser: true,
		es2022: true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	settings: {
		react: {
			version: 'detect'
		}
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['error'],
		'react/prop-types': 'off'
	}
}
