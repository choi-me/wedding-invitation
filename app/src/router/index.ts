import type { Language } from '@/i18n'

import { createRouter, createWebHistory } from 'vue-router'
import { env } from '@/env'
import { i18n, userLocale } from '@/i18n'
import LandingView from '../views/LandingView.vue'

const router = createRouter({
	history: createWebHistory(env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: `/${userLocale}`,
		},
		{
			path: '/:lang(ko|zh)',
			name: 'landing',
			component: LandingView,
		},
		{
			path: '/:catchAll(.*)',
			redirect: '/',
		},
	],

	scrollBehavior(to, _from, savedPosition) {
		if (to.hash) {
			const isFirstRoute = _from.name == null

			return new Promise((resolve) => {
				setTimeout(() => {
					resolve({ el: to.hash, top: 60, behavior: isFirstRoute ? 'auto' : 'smooth' })
				}, 50)
			})
		} else if (savedPosition) {
			return savedPosition
		} else {
			return { left: 0, top: 0 }
		}
	},
})

router.beforeEach((to, _from, next) => {
	const { lang } = to.params

	if (i18n.global.locale.value !== lang) {
		i18n.global.locale.value = lang as Language
	}

	next()
})

export default router
