<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import BGMButton from './BGMButton.vue'

const bgm = useTemplateRef('bgm')

const playing = ref(false)

const onClick = () => {
	if (playing.value) {
		pause()
	} else {
		play()
	}
}

const play = () => {
	try {
		bgm.value?.play()
		playing.value = true
	} catch (e) {
		if (e instanceof Error) {
			alert(e.message)
		}
		playing.value = false
	}
}

const pause = () => {
	try {
		bgm.value?.pause()
	} finally {
		playing.value = false
	}
}
</script>

<template>
	<div class="my-40">
		<audio ref="bgm" src="/bgm/bgm1.mp3" preload="auto" loop></audio>

		<div class="flex items-center justify-center">
			<BGMButton :playing @click="onClick" />
		</div>
	</div>
</template>
