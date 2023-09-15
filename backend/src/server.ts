import { app } from './app'

const PORT = 3333

app
	.listen({
		host: '0.0.0.0',
		port: PORT,
	})
	.then(() => console.log(`Server running on port ${PORT}`))
