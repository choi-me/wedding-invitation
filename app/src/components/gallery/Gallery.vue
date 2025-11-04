<script setup lang="ts">
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import { onMounted, useTemplateRef } from 'vue'
import { PageContainer } from '../container'

import 'photoswipe/photoswipe.css'
import 'photoswipe/style.css'

const images = [
	{ w: 1001, h: 1548 },
	{ w: 1000, h: 1479 },
	{ w: 1001, h: 693 },
	{ w: 1001, h: 1364 },
	{ w: 1001, h: 1548 },

	{ w: 1001, h: 1426 },
	{ w: 1001, h: 1520 },
	{ w: 1001, h: 764 },
	{ w: 1003, h: 628 },
	{ w: 999, h: 1345 },

	{ w: 999, h: 1500 },
	{ w: 1001, h: 1475 },
].map((item, i) => {
	return {
		...item,
		url: `/images/main-${String(i + 1).padStart(2, '0')}.jpg`,
	}
})

const el = useTemplateRef<HTMLDivElement>('el')

onMounted(() => {
	if (el.value == null) return

	const lightbox = new PhotoSwipeLightbox({
		gallery: el.value,
		children: 'a',
		showHideAnimationType: 'zoom',
		showAnimationDuration: 500,
		hideAnimationDuration: 500,
		pswpModule: () => import('photoswipe'),
	})
	lightbox.init()
})
</script>

<template>
	<PageContainer>
		<div id="gallery" ref="el" class="pswp-gallery grid grid-cols-3 gap-4">
			<a
				v-for="(image, index) in images"
				:key="index"
				:href="image.url"
				:data-pswp-width="image.w"
				:data-pswp-height="image.h"
				target="_blank"
			>
				<img
					placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88B8AAqUB0Y/H4mkAAAAASUVORK5CYII="
					:alt="image.url"
					:src="image.url"
					class="aspect-square object-cover"
				/>
			</a>
		</div>
	</PageContainer>
</template>
