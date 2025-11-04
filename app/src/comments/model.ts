import type { HttpMethod } from '@/types'

import { env } from '@/env'
import { WrongPasswordError } from '@/error'

export interface Comment {
	id: string
	name: string
	pw: string
	body: string
	createdAt: Date
	updatedAt: Date
}

async function fetchComment(method: HttpMethod, data?: Record<string, any>) {
	const url = `${env.API_HOST}/comments`
	return await fetch(url, {
		method,
		body: data ? JSON.stringify(data) : undefined,
	})
}

export async function addComment(data: Pick<Comment, 'name' | 'pw' | 'body'>): Promise<Comment> {
	const res = await fetchComment('POST', data)

	const newData: Comment = await res.json()
	newData.createdAt = new Date(newData.createdAt)

	return newData
}

export async function deleteComment(id: string, password: string) {
	const res = await fetchComment('DELETE', { id, password })

	if (res.status === 401) throw new WrongPasswordError()

	return await res.json()
}

export async function getComments(): Promise<Comment[]> {
	const res = await fetchComment('GET')

	const items = (await res.json()) as Comment[]

	const newItems = items.map((item) => {
		return {
			...item,
			createdAt: new Date(item.createdAt),
		} as Comment
	})

	return newItems
}

export async function updateComment(
	data: Pick<Comment, 'id' | 'name' | 'pw' | 'body'>,
): Promise<Comment> {
	const res = await fetchComment('PATCH', data)

	if (res.status === 401) throw new WrongPasswordError()

	const updatedData: Comment = await res.json()
	updatedData.updatedAt = new Date(updatedData.updatedAt)

	return updatedData
}
