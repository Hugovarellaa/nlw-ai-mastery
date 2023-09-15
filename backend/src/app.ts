import fastify from 'fastify'
import { createTranscription } from './routes/create-transcription'
import { generateAiCompletionRoute } from './routes/generate-ai-completion'
import { getAllPrompts } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'

export const app = fastify()

app.register(getAllPrompts, {
	prefix: '/prompts',
})

app.register(uploadVideoRoute, {
	prefix: '/upload-video',
})

app.register(createTranscription, {
	prefix: '/videos',
})

app.register(generateAiCompletionRoute, {
	prefix: '/ai/completion',
})
