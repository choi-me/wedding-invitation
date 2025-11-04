<script setup lang="ts">
import { openWithNewTab } from '@/utils'
import { PageContainer } from '../container'
import Icon from '../icon/Icon.vue'

const openZoom = () => {
	const zoomUrl = 'https://us02web.zoom.us/j/6276272020?pwd=V1B4VmNqZ1FFRmRqUThaemhQWnU2QT09'
	openWithNewTab(zoomUrl)
}
</script>

<template>
	<div class="bg-black3 text-gray6 py-48 text-center break-keep">
		<PageContainer>
			<div class="leading-160% text-15">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<div v-html="$t('notice.desc1')" />

				<!-- eslint-disable-next-line vue/no-v-html -->
				<div class="mt-8" v-html="$t('notice.desc2')" />

				<div class="mx-auto mt-8 max-w-200 text-left">
					<div class="flex">
						<span class="flex-1">Zoom ID</span>
						<span class="flex-1">{{ $t('info.zoomId') }}</span>
					</div>
					<div class="flex">
						<span class="flex-1">{{ $t('field.pw') }}</span>
						<span class="flex-1">XXXXXX</span>
					</div>
				</div>

				<div class="mt-20 flex justify-center">
					<button
						class="text-black3 flex items-center justify-center gap-8 rounded-8 bg-[#a5aab2] px-20 py-10"
						@click="openZoom"
					>
						<Icon name="youtube" color="#31343c" />
						{{ $t('notice.enterZoom') }}
					</button>
				</div>
			</div>
		</PageContainer>
	</div>
</template>
