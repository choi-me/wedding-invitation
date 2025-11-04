<script setup lang="ts">
const { dest, text } = defineProps<{
	dest: string
	text: string
}>()
</script>

<template>
	<router-link
		:to="{ hash: `#${dest}` }"
		class="flex h-48 flex-1 items-center justify-center text-sm text-white"
	>
		{{ text }}
	</router-link>
</template>
