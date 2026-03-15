import fastify from 'fastify'

const app = fastify();

app.get('/', async (req, rep) => {
	return 'Nice'
});

app.get('/hello', async (req, rep) => {
	return 'HELLO WORLD'
});

app.listen({port:3333, host: '0.0.0.0'}).then(() => {
	console.log("SERVER RUNNING on http://localhost:3333")
});
