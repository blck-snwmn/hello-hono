import { Hono } from 'hono'

type Bindings = {
	TEST: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(async (c, next) => {
	console.log('before')
	if (c.req.method === 'POST') {
		console.log(`POST ${c.req.url} ${JSON.stringify(c.req.body)}`)
	}
	await next()
	console.log('after')
})

app.get('/', (c) => c.text('Hello Cloudflare Workers! in GET'))
app.get('/b', (c) => c.text(c.env.TEST))
app.post('/', (c) => c.text('Hello Cloudflare Workers! in POST'))

export default app
