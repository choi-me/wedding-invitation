import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { commentsRoute } from './comments/comments.route.js'

import 'dotenv/config'

const app = new Hono()

app.use('/*', cors())
app.route('/comments', commentsRoute)

export default app
