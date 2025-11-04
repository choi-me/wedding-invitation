<script setup lang="ts">
import Icon from '../icon/Icon.vue'

const { playing } = defineProps<{
	playing: boolean
}>()
</script>

<template>
	<button
		:class="[
			'flex items-center justify-center',
			'h-40 w-40',
			'border-black3 rounded-full border-3',
		]"
	>
		<Icon v-if="playing" name="pause" />
		<Icon v-else name="play" />
	</button>
</template>
