<script setup lang="ts">
import { PageContainer } from '../container'
import Icon from '../icon/Icon.vue'
import Person from './Person.vue'
</script>

<template>
	<PageContainer>
		<div class="flex justify-center gap-20 py-48">
			<Person role="groom" />
			<Icon name="heart" color="#e5c0ba" class="mt-36 h-32 w-32" />
			<Person role="bride" />
		</div>
	</PageContainer>
</template>
