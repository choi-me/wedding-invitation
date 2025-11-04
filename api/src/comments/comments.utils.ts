import type { Comment } from './comments.types.js'

import { verify } from '@node-rs/argon2'
import { turso } from '../db/index.js'

export async function findById<T>(id: string, select: string[] = ['*']): Promise<T | null> {
	const { rows } = await turso.execute(`SELECT ${select.join(', ')} FROM comments WHERE id = $id`, {
		id,
	})
	if (!rows.length) return null

	return rows[0] as T
}

export async function deleteById(id: string) {
	const { rows } = await turso.execute('DELETE FROM comments WHERE id = $id', { id })
	return !!rows.length
}

export async function matchPassword(id: string, pw: string) {
	const item = await findById<Comment>(id, ['pw'])
	if (!item) return false

	return await verify(item.pw, pw)
}
