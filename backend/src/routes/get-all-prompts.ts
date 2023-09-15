import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function getAllPrompts(app: FastifyInstance) {
	app.get('/', async () => {
		const prompts = await prisma.prompt.findMany()

		return { prompts }
	})
}
