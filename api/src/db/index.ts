import { createClient } from '@libsql/client'

export const turso = createClient({
	url: process.env.DB_HOST as string,
	authToken: process.env.DB_TOKEN as string,
})
