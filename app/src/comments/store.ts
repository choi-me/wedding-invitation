import type { Comment } from './model'

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { updateComment as apiUpdateComment } from './model'

export const useCommentStore = defineStore('comment', () => {
	const comments = ref<Comment[]>([])
	const editingComment = ref<Comment>()
	const editModalVisible = ref(false)

	const setComments = (items: Comment[]) => {
		comments.value = items
	}

	const updateComment = async (data: Pick<Comment, 'id' | 'name' | 'pw' | 'body'>) => {
		const updatedComment = await apiUpdateComment(data)

		setComments(
			comments.value.map((item) => {
				if (item.id !== data.id) return item

				item.name = updatedComment.name
				item.body = updatedComment.body
				item.updatedAt = updatedComment.updatedAt

				return { ...item }
			}),
		)
	}

	const openEditModal = (comment: Comment) => {
		editingComment.value = comment
		editModalVisible.value = true
	}
	const closeEditModal = () => {
		editModalVisible.value = false
	}

	return {
		comments,
		editingComment,
		editModalVisible,

		setComments,
		updateComment,
		openEditModal,
		closeEditModal,
	}
})
