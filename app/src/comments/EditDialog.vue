<script setup lang="ts">
import type { Comment } from './model'

import { reactive, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icon/Icon.vue'
import { WrongPasswordError } from '@/error'
import { deleteComment } from './model'
import { useCommentStore } from './store'

const { t } = useI18n()
const store = useCommentStore()

const dialog = useTemplateRef('dialog')
const elName = useTemplateRef('name')
const elPw = useTemplateRef('pw')
const elBody = useTemplateRef('body')

const fieldNames2 = ['name', 'pw', 'body'] as const
type FieldName = 'id' | 'name' | 'pw' | 'body'

const refs = { name: elName, pw: elPw, body: elBody }

const fields = reactive({
	id: '',
	name: '',
	pw: '',
	body: '',
})

watch(
	() => store.editingComment,
	(editingComment) => {
		for (const key in fields) {
			const key2 = key as FieldName
			fields[key2] = editingComment?.[key2] || ''
		}

		fields.pw = ''
	},
)

watch(
	() => store.editModalVisible,
	(editModalVisible) => {
		if (dialog.value && editModalVisible) {
			dialog.value.showModal()
		}
	},
)

const close = () => {
	dialog.value?.close()
	store.closeEditModal()
}

const _delete = async () => {
	if (fields.pw.trim() === '') {
		alert(t('validator.empty', { field: t('field.pw') }))

		elPw.value?.focus()
		return false
	}

	try {
		await deleteComment(fields.id, fields.pw)

		store.setComments(store.comments.filter((item) => item.id !== fields.id))
		close()
	} catch (err) {
		if (err instanceof WrongPasswordError) {
			alert(t('validator.wrong', { field: t('field.pw') }))
			elPw.value?.focus()
		}
	}
}

const edit = async () => {
	// Validate fields
	const isValid = fieldNames2.every((fieldName) => {
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
	) as Pick<Comment, 'id' | 'name' | 'pw' | 'body'>

	try {
		await store.updateComment(data)
		close()
	} catch (err) {
		if (err instanceof WrongPasswordError) {
			alert(t('validator.wrong', { field: t('field.pw') }))
			elPw.value?.focus()
		}
	}
}
</script>

<template>
	<dialog ref="dialog" class="w-full max-w-720 rounded-8 border-0" @close="close">
		<div class="flex items-center justify-center">
			<div class="rounded-10 m-20 w-full bg-white p-10">
				<div class="flex">
					<button class="hover:bg-whiteF5 ml-auto rounded-8" @click="close">
						<Icon name="close" :size="32" />
					</button>
				</div>

				<div class="grid gap-12 px-4 py-20">
					<input
						ref="name"
						v-model="fields.name"
						type="text"
						maxlength="50"
						:placeholder="$t('field.name')"
					/>
					<input
						ref="pw"
						v-model="fields.pw"
						type="password"
						maxlength="20"
						:placeholder="$t('field.pw')"
					/>
					<textarea
						ref="body"
						v-model="fields.body"
						class="w-full text-15"
						maxlength="500"
						:placeholder="$t('field.body.placeholder')"
						rows="4"
					/>

					<div class="flex gap-12">
						<button class="cmd w-1/3 border border-grayC" @click="_delete">
							{{ $t('command.delete') }}
						</button>
						<button class="cmd bg-lightBlue flex-1 text-white" @click="edit">
							{{ $t('command.edit') }}
						</button>
					</div>
				</div>
			</div>
		</div>
	</dialog>
</template>

<style>
@reference '../style/app.css';

dialog::backdrop {
	@apply bg-black/72;
}

dialog[open],
dialog[open]::backdrop {
	animation: fade-in 0.25s ease-out;
}

button.cmd {
	@apply rounded-4 p-12 text-center text-15;
}
</style>
