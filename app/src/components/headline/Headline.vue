<script setup lang="ts">
import jpgIntro from '@/assets/img/intro.jpg'
</script>

<template>
	<div class="relative">
		<img alt="Wedding" :src="jpgIntro" />
		<div
			:class="[
				'absolute right-0 bottom-1/24 left-0',
				'text-center font-bahagia text-28 text-white',
			]"
		>
			Gwang-won & Hee-in
		</div>
	</div>
</template>
