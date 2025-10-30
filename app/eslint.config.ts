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

	pluginVue.configs['flat/essential'],
	vueTsConfigs.recommended,

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
						{ newlinesBetween: 'always' },
						['type-internal', 'type-subpath'],
						{ newlinesBetween: 'always' },
						['type-parent', 'type-sibling', 'type-index'],
						{ newlinesBetween: 'always' },

						'builtin',
						'external',
						{ newlinesBetween: 'always' },
						['internal', 'subpath'],
						{ newlinesBetween: 'always' },
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
