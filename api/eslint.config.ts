import pluginOxlint from 'eslint-plugin-oxlint'
import perfectionist from 'eslint-plugin-perfectionist'
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
	// {
	// 	rules: {
	// 		'vue/block-order': [
	// 			'error',
	// 			{
	// 				order: ['script', 'template', 'style'],
	// 			},
	// 		],
	// 	},
	// },

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
	skipFormatting
)
