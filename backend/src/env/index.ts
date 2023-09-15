import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
	PORT: z.coerce.number().default(3333),
	DATABASE_URL: z.string(),
	OPEN_AI_SECRET_KEY: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.error(
		`❌❌ Environment variable not found ❌❌  ${_env.error.format()}`,
	)
	throw new Error('❌❌ Environment variable not found ❌❌')
}

export const env = _env.data
