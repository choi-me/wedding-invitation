<script setup lang="ts">
import { onMounted } from 'vue'
import CommentItem from './CommentItem.vue'
import { getComments } from './model'
import { useCommentStore } from './store'

const store = useCommentStore()

onMounted(async () => {
	store.setComments(await getComments())
})
</script>

<template>
	<div>
		<CommentItem v-for="comment in store.comments" :key="comment.id" :comment />
	</div>
</template>
