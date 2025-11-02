import { Hono } from 'hono'

const app = new Hono()

const welcomeStrings = ['Hello!', 'api server test']

app.get('/', (c) => {
	return c.text(welcomeStrings.join('\n\n'))
})

app.get('/comments', async (c) => {
	return c.json({
		list: [{ name: 'A', body: 'B', createdAt: new Date() }],
	})
	// const comments = await getComments()
	// return c.json(comments)
})

export default app
