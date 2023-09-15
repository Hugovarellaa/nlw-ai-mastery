import { fastifyMultipart } from '@fastify/multipart'
import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream'
import util from 'node:util'

const pump = util.promisify(pipeline)

export async function uploadVideoRoute(app: FastifyInstance) {
	app.register(fastifyMultipart, {
		limits: {
			fileSize: 1024 * 1024 * 25, // 25MB
		},
	})

	app.post('/', async (request, reply) => {
		const data = await request.file()

		if (!data) {
			return reply.send({
				status: 400,
				message: 'No file uploaded',
			})
		}

		const extension = path.extname(data.filename)

		if (extension !== '.mp3') {
			return reply.send({
				status: 400,
				message: 'Invalid input type, please upload a file MP3',
			})
		}

		const fileBaseName = path.basename(data.filename)
		const fileName = `${fileBaseName}-${randomUUID()}.mp3`
		const uploadDestination = path.resolve(__dirname, '../../upload', fileName)

		const video = await pump(data.file, createWriteStream(uploadDestination))

		return { video }
	})
}
