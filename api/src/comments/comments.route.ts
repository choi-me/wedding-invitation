import { Hono } from 'hono'
import { turso } from '../db/index.js'
import { hash } from '@node-rs/argon2'
import { UTCDate } from '@date-fns/utc'
import { deleteById, matchPassword } from './comments.utils.js'

export const commentsRoute = new Hono()

commentsRoute.get('/', async (c) => {
	const result = await turso.execute(
		'SELECT id, name, body, created_at, updated_at FROM comments ORDER BY created_at DESC'
	)

	return c.json(
		result.rows.map(({ id, name, body, created_at, updated_at }) => ({
			id,
			name,
			body,
			createdAt: created_at,
			updatedAt: updated_at,
		}))
	)
})

// Add comment
commentsRoute.post('/', async (c) => {
	const { name, pw, body } = await c.req.json()
	const pwHash = await hash(pw)

	const createdAt = new UTCDate().toISOString()

	const result = await turso.execute(
		'INSERT INTO comments (name, pw, body, created_at, updated_at) VALUES ($name, $pwHash, $body, $createdAt, $createdAt)',
		{ name, pwHash, body, createdAt }
	)

	if (!result) {
		return c.json({ message: 'Failed to add comment' }, { status: 500 })
	}

	const id = Number(result.lastInsertRowid)

	return c.json({
		id,
		name,
		body,
		createdAt,
	})
})

// Update comment
commentsRoute.patch('/', async (c) => {
	const { id, name, pw, body } = await c.req.json()

	const matchPw = await matchPassword(id, pw)
	if (!matchPw) {
		return c.json(null, { status: 401 })
	}

	const updatedAt = new UTCDate().toISOString()

	const result = await turso.execute(
		'UPDATE comments SET name=$name, body=$body, updated_at=$updatedAt WHERE id = $id',
		{ id, name, body, updatedAt }
	)

	if (!result) {
		return c.json({ message: 'Failed to update comment' }, { status: 500 })
	}

	return c.json({
		id,
		name,
		body,
		updatedAt,
	})
})

// Delete comment
commentsRoute.delete('/', async (c) => {
	const { id, password } = await c.req.json()

	const matchPw = await matchPassword(id, password)
	if (!matchPw) {
		return c.json(null, { status: 401 })
	}

	const result = await deleteById(id)

	return c.json({ result })
})
