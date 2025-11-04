<script setup lang="ts">
import type { IconDefinition, IconName } from './icons'

import { onMounted, ref } from 'vue'
import { icons } from './icons'

interface Props {
	name: IconName
	color?: string
	size?: number
}

const { name, color = 'current', size = 24 } = defineProps<Props>()

const defaultIcon: IconDefinition = {
	data: '',
	viewBoxSize: 24,
}

const icon = ref<IconDefinition>({ ...defaultIcon })

onMounted(async () => {
	const importFn = icons[name]

	if (typeof importFn === 'function') {
		icon.value = { ...defaultIcon, ...(await icons[name]()).default }
	}
})
</script>

<template>
	<!-- eslint-disable vue/no-v-html -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:width="size"
		:height="size"
		:viewBox="`0 0 ${icon?.viewBoxSize} ${icon?.viewBoxSize}`"
		:fill="icon?.useStrokeColor ? undefined : color"
		:stroke="icon?.useStrokeColor ? color : undefined"
		v-html="icon?.data"
	/>
	<!-- eslint-enable -->
</template>
