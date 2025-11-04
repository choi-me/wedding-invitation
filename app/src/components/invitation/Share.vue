<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { env } from '@/env'
import Icon from '../icon/Icon.vue'

const { t } = useI18n()

const host = env.HOST

const shareKakaotalk = () => {
	const url = location.origin

	window.Kakao.Link.sendDefault({
		objectType: 'feed',
		content: {
			title: t('invitation.title'),
			description: host,
			imageUrl: `${host}/images/intro-text.jpg`,
			link: {
				mobileWebUrl: url,
				webUrl: url,
			},
		},
		buttons: [
			{
				title: t('invitation.viewButton'),
				link: {
					mobileWebUrl: url,
					webUrl: url,
				},
			},
		],
	})
}
</script>

<template>
	<div class="flex justify-center py-48">
		<button
			title="Sharing on KakaoTalk"
			class="flex items-center justify-center"
			@click="shareKakaotalk"
		>
			<Icon name="kakaotalk" :size="48" />
		</button>
	</div>
</template>
