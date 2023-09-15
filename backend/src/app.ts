import fastify from 'fastify'
import { createTranscription } from './routes/create-transcription'
import { GetAllPrompts } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'

export const app = fastify()

app.register(GetAllPrompts, {
	prefix: '/prompts',
})

app.register(uploadVideoRoute, {
	prefix: '/upload-video',
})

app.register(createTranscription, {
	prefix: '/videos',
})
