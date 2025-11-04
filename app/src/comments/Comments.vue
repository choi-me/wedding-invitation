<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { onUnmounted, ref } from 'vue'
import { PageContainer } from '@/components/container'
import CommentList from './CommentList.vue'
import EditDialog from './EditDialog.vue'
import NewForm from './NewForm.vue'

const container = ref<HTMLDivElement>()

const newFormVisible = ref(false)

const { stop } = useIntersectionObserver(
	container,
	(entries) => {
		entries.forEach((_entry) => {
			newFormVisible.value = _entry.isIntersecting
		})
	},
	{ rootMargin: '0px 0px -300px', threshold: 0 },
)

onUnmounted(() => {
	stop()
})
</script>

<template>
	<div ref="container" class="pt-48">
		<div id="comment" class="mb-32 text-center font-bahagia text-28 text-grayC">Congratulation</div>

		<PageContainer>
			<CommentList />
		</PageContainer>

		<EditDialog />

		<NewForm :visible="newFormVisible" />
	</div>
</template>
