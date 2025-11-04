<script setup lang="ts">
import { useSeoMeta } from '@unhead/vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import GNB from '@/components/nav/GNB.vue'

const { t } = useI18n()
const route = useRoute()

useSeoMeta({
	title: computed(() => t('title')),
	ogDescription: computed(() => t('og.desc')),
	ogLocale: computed(() => t('locale')),
	ogSiteName: 'GW & HI - Wedding Invitation',
	ogTitle: computed(() => t('og.title')),
	ogImage: `${location.origin}/images/intro/intro.jpg`,
	ogType: 'website',
	ogUrl: computed(() => `${location.origin}${route.path}`),
})
</script>

<template>
	<header class="sticky top-0 right-0 left-0 z-10">
		<GNB />
	</header>

	<main class="relative mx-auto max-w-800 bg-white">
		<slot />
	</main>

	<footer class="bg-black3 text-gray6 pt-48 pb-240 text-center text-13">
		<div>Made by Lucas (G.W) Choi</div>
		<div class="copyright">Copyright ⓒ 2020~ GW & HI, wedding.choi.me</div>

		<div class="flex gap-8 mt-16 justify-center items-center text-gray-400">
			<router-link to="/ko">한국어</router-link>
			<div class="size-3 rounded-full bg-gray6" />
			<router-link to="/zh">中文</router-link>
		</div>
	</footer>
</template>
