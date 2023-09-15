import fastify from 'fastify'
import { GetAllPrompts } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'

export const app = fastify()

app.register(GetAllPrompts, {
	prefix: '/prompts',
})

app.register(uploadVideoRoute, {
	prefix: '/upload-video',
})
