import * as authOpts from "./authSchema.js"
import {db} from "../usersServer.js"

async function authRoutes(app, options) {
	// app.get('/auth/register', async (req, reply) => {

	// });

	app.post('/auth/register', authOpts.authRegisterOpts);

	app.get('/auth/login', (req, reply) => {
		reply.send({resp: "ok"});
	});

	app.post('/auth/login', (req, reply) => {

	});

	app.post('/auth/logout', (req, reply) => {

	});



	app.get('/auth/debug_db', async (req, reply) => {
		const query = (sql, params) => {
			return (new Promise((resolve, reject) => {
				db.all(sql, params, (err, rows) => {
					if (err)
						reject(err);
					else
						resolve(rows);
				});
			}));
		}

		try{
			const rows = await query('SELECT * FROM users');
			return (reply.send(rows));
		} catch (err) {
			req.log.error(`\n${err}\n`);
			reply.internalServerError("Database error");
		}
	});
}

export { authRoutes };
