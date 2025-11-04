<script setup lang="ts">
const { appName } = defineProps<{
	appName: string
}>()
</script>

<template>
	<button class="h-48 w-48 overflow-hidden rounded-8">
		<img :alt="appName" :src="`/images/icons/app/${appName}.png`" />
	</button>
</template>
