<script setup lang="ts">
import type { Comment } from './model'

import { reactive, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icon/Icon.vue'
import router from '@/router'
import { addComment } from './model'
import { useCommentStore } from './store'

const { visible = false } = defineProps<{
	visible?: boolean
}>()

const store = useCommentStore()
const { t } = useI18n()

const refs = {
	name: useTemplateRef('name'),
	pw: useTemplateRef('pw'),
	body: useTemplateRef('body'),
}

const fields = reactive({
	name: '',
	pw: '',
	body: '',
})
const fieldNames = Object.keys(fields) as (keyof typeof fields)[]

const add = async () => {
	// Validate fields
	const isValid = fieldNames.every((fieldName) => {
		if (fields[fieldName].trim() === '') {
			alert(t('validator.empty', { field: t(`field.${fieldName}`) }))
			refs[fieldName].value?.focus()
			return false
		}

		return true
	})
	if (!isValid) return

	const data = Object.entries(fields).reduce(
		(obj, [key, value]) => ({ ...obj, [key]: value }),
		{},
	) as Pick<Comment, 'name' | 'pw' | 'body'>

	const newComment = await addComment(data)

	if (newComment) {
		store.setComments([newComment, ...store.comments])

		// Reset fields
		fieldNames.forEach((fieldName) => {
			fields[fieldName] = ''
		})

		router.push({ hash: '#comment' })
	}
}
</script>

<template>
	<section :class="{ on: visible }">
		<input
			ref="name"
			v-model="fields.name"
			type="text"
			required
			maxlength="50"
			:placeholder="$t('field.name')"
		/>
		<input
			ref="pw"
			v-model="fields.pw"
			type="password"
			required
			maxlength="20"
			:placeholder="$t('field.pw')"
		/>

		<div class="col-span-2 flex">
			<textarea
				ref="body"
				v-model="fields.body"
				class="text-15"
				required
				maxlength="500"
				:placeholder="$t('field.body.placeholder')"
				rows="4"
			/>

			<button class="bg-lightBlue ml-8 rounded-4 px-16" @click="add">
				<Icon name="send" color="white" />
			</button>
		</div>
	</section>
</template>

<style>
@reference '../style/app.css';

section {
	@apply fixed inset-0 top-auto z-10 p-16;
	@apply grid grid-cols-2 gap-8;
	@apply border-t border-grayE bg-white;
	@apply origin-bottom scale-y-0 duration-300;
}
section.on {
	@apply scale-y-100;
}
</style>
