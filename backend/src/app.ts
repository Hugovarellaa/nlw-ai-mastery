import fastify from 'fastify'
import { GetAllPrompts } from './routes/get-all-prompts'

export const app = fastify()

app.register(GetAllPrompts, {
	prefix: '/prompts',
})
