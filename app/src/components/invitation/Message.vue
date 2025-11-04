<script setup lang="ts">
import { PageContainer } from '../container'
</script>

<template>
	<div class="bg-whiteF2 py-48 text-center">
		<PageContainer>
			<div class="pb-4 text-20 tracking-[.5rem] text-gray9 italic">
				{{ $t('message.title') }}
			</div>

			<div class="mx-auto my-16 h-1 w-72 bg-grayD" />

			<!-- eslint-disable-next-line vue/no-v-html -->
			<div class="leading-160%" v-html="$t('message.content')" />

			<div class="mx-auto my-16 h-1 w-72 bg-grayD" />

			<div class="leading-[150%] pt-4 text-20 font-bold">
				<div class="text-28">{{ $t('info.date') }}</div>
				<div class="text-24">{{ $t('info.time') }}</div>
			</div>
			<div class="mt-24">
				<div class="text-24">{{ $t('info.place') }}</div>
				<div class="text-20">{{ $t('info.place2') }}</div>
			</div>

			<div class="mx-auto my-24 h-1 w-72 bg-grayD" />

			<div class="leading-[150%]">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-html="$t('message.desc')" />

				<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-if="$i18n.locale === 'ko'" class="mt-16 text-14" v-html="$t('message.desc2')" />
			</div>
		</PageContainer>
	</div>
</template>
