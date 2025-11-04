import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginOxlint from 'eslint-plugin-oxlint'
import perfectionist from 'eslint-plugin-perfectionist'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
	{
		name: 'app/files-to-lint',
		files: ['**/*.{ts,mts,tsx,vue}'],
	},

	globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

	pluginVue.configs['flat/recommended'],
	vueTsConfigs.recommended,
	{
		rules: {
			// 🎨 Enforce type definitions to consistently use either interface or type.
			'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
			// ✅ Disallow accidentally using the "empty object" type.
			'@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
			// ✅ Disallow the any type.
			'@typescript-eslint/no-explicit-any': 'off',
			// ✅ Disallow unused variables.
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					args: 'after-used',
					// (_unusedParam1, usedParam1) => { fn1(usedParam1) }
					argsIgnorePattern: '^_',
					caughtErrors: 'none',
					ignoreRestSiblings: true,
					vars: 'all',
					// const ignoredUnused1 = true, unused2Ignored = 10;
					varsIgnorePattern: '[iI]gnored',
				},
			],
		},
	},
	{
		rules: {
			'vue/block-order': [
				'error',
				{
					order: ['script', 'template', 'style'],
				},
			],
			'vue/multi-word-component-names': 'off',
		},
	},

	{
		plugins: { perfectionist },
		rules: {
			'perfectionist/sort-imports': [
				'error',
				{
					internalPattern: ['^@/', '^~', '^\\$'],
					groups: [
						'type-builtin',
						'type-external',
						['type-internal', 'type-subpath'],
						['type-parent', 'type-sibling', 'type-index'],
						{ newlinesBetween: 'always' },

						'builtin',
						'external',
						['internal', 'subpath'],
						['parent', 'sibling', 'index'],
						{ newlinesBetween: 'always' },

						'side-effect',
						'unknown',
					],
					newlinesBetween: 'never',
					order: 'asc',
					type: 'natural',
				},
			],

			'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
			'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
		},
	},

	...pluginOxlint.configs['flat/recommended'],
	skipFormatting,
)
