import { OpenAIStream, streamToResponse } from 'ai'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { openai } from '../lib/openai'
import { prisma } from '../lib/prisma'

export async function generateAiCompletionRoute(app: FastifyInstance) {
	app.post('/', async (request, reply) => {
		const bodySchema = z.object({
			videoId: z.string().uuid(),
			prompt: z.string(),
			temperature: z.number().min(0).max(1).step(0.1).default(0.5),
		})

		const { videoId, prompt, temperature } = bodySchema.parse(request.body)

		const video = await prisma.video.findUniqueOrThrow({
			where: {
				id: videoId,
			},
		})

		if (!video.transcription) {
			return reply.status(400).send({
				message: 'No transcription found',
			})
		}

		const promptMessage = prompt.replace('{transcription}', video.transcription)

		const response = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			temperature,
			messages: [
				{
					role: 'user',
					content: promptMessage,
				},
			],
			stream: true,
		})

		// retornando a resposta da Open ai ao pouco enquanto carrega
		const stream = OpenAIStream(response)

		streamToResponse(stream, reply.raw, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			},
		})
	})
}
