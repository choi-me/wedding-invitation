<script setup lang="ts">
import GNBItem from './GNBItem.vue'
</script>

<template>
	<nav id="gnb" class="border-black4 bg-black3 flex w-full border-b">
		<GNBItem dest="top" text="HOME" />
		<GNBItem dest="gallery" text="PHOTO" />
		<GNBItem dest="location" text="MAP" />
		<GNBItem dest="comment" text="MESSAGE" />
	</nav>
</template>
