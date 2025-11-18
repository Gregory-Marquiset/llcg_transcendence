import Fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import fastifyBcrypt from 'fastify-bcrypt'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as health from './routes/health.js'
import * as tournament from '../game/tournaments/tournaments.js'
import * as auth from '../users/auth/auth.js'
import { runDatabase } from '../users/usersServer.js'

export const app = Fastify({
	logger: true
});
const rootDir = dirname(fileURLToPath(import.meta.url));

app.register(fastifyStatic, {
	root: join(rootDir, '../../frontend/webapp/dist/')
});

app.register(fastifyBcrypt, {
	saltWorkFactor: 12
})

runDatabase();

app.register(health.healthRoute);
app.register(health.ping);
app.register(tournament.tournamentsRoutes, { prefix: '/api/v1' });
app.register(auth.authRoutes, { prefix: '/api/v1' });



app.setErrorHandler((error, req, reply) => {
		app.log.error(error);
		if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500)
				return (reply.code(error.statusCode).send({ message: error.message}));
		reply.code(500).send({ message: "Internal server error" });
});

app.setNotFoundHandler(function (req, reply) {
		app.log.info('\nexecuting setNotFoundHandler\n');
		reply.code(404).send( { message:'404 Not found' });
});





app.get('/', async (req, reply) => {
	return reply.sendFile('index.html');
});

app.get('/tournois', async (req, reply) => {
	return reply.sendFile('index.html');
});

app.get('/jeu', async (req, reply) => {
	return reply.sendFile('index.html');
});


const start = async () => {
	try {
		await app.listen({port: 5000, host: '0.0.0.0'})
	} catch (err) {
		app.log.error(`\n${err}\n`);
		process.exit(1);
	}
}

start();
