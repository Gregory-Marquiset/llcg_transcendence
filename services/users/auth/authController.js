import hyperid from 'hyperid'
import {db} from '../usersServer.js' 

export const authRegister = async function (req, reply) {
	console.log(`\n${JSON.stringify(req.body)}\n`);

	const now = new Date();
	const dateTime = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

	//db.run('DROP TABLE IF EXISTS users');

	const query = (sql, params) => {
		return (new Promise((resolve, reject) => {
			db.run(sql, params, (err) => {
				if (err)
					reject(err);
				else
					resolve();
			});
		}));
	}

	try {
		const result = await query(`INSERT INTO users(username, email, password, createdAt) 
			VALUES (?, ?, ?, ?)`, [req.body.username, req.body.email, req.body.password, dateTime]);
		return (reply.code(201).send("New entry in database"));
	} catch (err) {
		const e = new Error(err.message);
		e.statusCode = 409;
		throw e
	}
}

