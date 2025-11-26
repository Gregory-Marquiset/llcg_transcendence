import * as authOpts from "./authSchema.js"
import { user_db } from "../usersServer.js"

async function authRoutes(app, options) {

	app.post('/auth/register',authOpts.authRegisterOpts);

	app.post('/auth/login', authOpts.authLoginOpts);

	app.get('/auth/me', { onRequest: [app.authenticate], ...authOpts.authMeOpts });

	app.delete('/auth/logout', authOpts.authLogoutOpts);


	//DEBUGGING ET DELETE TABLE DANS LA DB
	app.get('/auth/debug_db', async (req, reply) => {
		const query = (sql, params) => {
			return (new Promise((resolve, reject) => {
				user_db.all(sql, params, (err, rows) => {
					if (err)
						reject(err);
					else
						resolve(rows);
				});
			}));
		}

		try{
			const result = await query(`SELECT * FROM users`);
			return (reply.send(result));
		} catch (err) {
			req.log.error(`\n${err}\n`);
			return (reply.code(500).send({ error: "Database error" }));
		}
	});

	app.delete('/auth/delete_all_users', async (req, reply) => {
		user_db.run('DELETE FROM users', (err) => {
			if (err)
			{
				req.log.error(err);
				return (reply.code(500).send(({ message: "Database deletion error"})))
			}
		});
		return (reply.code(200).send({ message: "All users deleted" }));
	})
}

export { authRoutes };
