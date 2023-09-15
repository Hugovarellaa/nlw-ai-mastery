import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function createTranscription(app: FastifyInstance) {
	app.post('/:videoId/transcription', async (request, reply) => {
		const paramsSchema = z.object({
			videoId: z.string().uuid(),
		})

		const bodySchema = z.object({
			prompt: z.string(),
		})

		const { videoId } = paramsSchema.parse(request.params)
		const { prompt } = bodySchema.parse(request.body)

		const video = await prisma.video.findUniqueOrThrow({
			where: {
				id: videoId,
			},
		})
		if (!video) {
			return reply.status(404).send({
				message: 'Video not found',
			})
		}

		return { videoId, prompt, video }
	})
}
