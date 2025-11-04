<script setup lang="ts">
import Icon from '../icon/Icon.vue'

const { role } = defineProps<{
	role: 'bride' | 'groom'
}>()
</script>

<template>
	<div class="text-center">
		<img
			:alt="role"
			class="h-100 w-100 rounded-full object-cover"
			:src="`/images/face-${role}.jpg`"
		/>

		<div class="mt-16 font-bold">{{ role.toUpperCase() }}</div>
		<div class="mt-8 mb-4">{{ $t(`${role}.parent`) }}</div>
		<div class="text-14">{{ $t(`${role}.childType`) }}</div>
		<div class="mt-8 text-20 tracking-[.25rem]">{{ $t(`${role}.firstName`) }}</div>

		<a
			class="mx-auto mt-20 flex h-48 w-48 items-center justify-center rounded-full bg-[#9ee79e]"
			:href="`tel:${$t(`${role}.mobile`)}`"
		>
			<Icon name="call" color="white" :size="32" />
		</a>
	</div>
</template>
