import { app } from '../../gateway/server.js'
import { db } from '../usersServer.js' 

export const authRegister = async function (req, reply) {
	console.log(`\n${JSON.stringify(req.body)}\n`);

	const now = new Date();
	const dateTime = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

	const query = (sql, params) => {
		return (new Promise((resolve, reject) => {
			db.run(sql, params, (err) => {
				if (err)
					reject(err);
				resolve();
			});
		}));
	}

	try {
		const hashedPWD = await app.bcrypt.hash(req.body.password);

		const result = await query(`INSERT INTO users(username, email, password, createdAt) 
			VALUES (?, ?, ?, ?)`, [req.body.username, req.body.email, hashedPWD, dateTime]);
		
		return (reply.code(201).send("New entry in database"));
	} catch (err) {
		const e = new Error(err.message);
		e.statusCode = 409;
		throw e;
	}
}


export const authLogin = async function (req, reply) {
	console.log(`\n${JSON.stringify(req.body)}\n`);

	const query = (sql, params) => {
		return (new Promise((resolve, reject) => {
			db.get(sql, params, (err, row) => {
				if (err)
					reject(err);
				resolve(row);
			});
		}));
	}

	try {
		const userHashedPassword = await query('SELECT password FROM users WHERE email = ?', [req.body.email]);

		const match = await app.bcrypt.compare(req.body.password, userHashedPassword.password);
		
		if (match === true)
		{
			const userInfo = await query('SELECT id, username FROM users WHERE email = ?', [req.body.email]);
			console.log(`\n${JSON.stringify(userInfo)}\n`);

			const token = app.jwt.sign({ userInfo });

			return (reply.code(200).send( { token }));
		}
		const err = new Error("Invalid credentials");
		err.statusCode = 401;
		throw err;
	} catch (err) {
		if(err.statusCode)
			throw err;
		err.statusCode = 500;
		throw err;
	}
}


export const authMe = async function (req, reply) {
	console.log(`\n${JSON.stringify(req.user)}\n`);

	const query = (sql, params) => {
		return (new Promise((resolve, reject) => {
			db.get(sql, params, (err, row) => {
				if (err)
					reject(err);
				resolve(row);
			});
		}));
	}
	
	try {
		const userInfos = await query('SELECT id, username, email, createdAt FROM users WHERE id = ?', req.user.userInfo.id);
		console.log(`\n${JSON.stringify(userInfos)}\n`);
		return (reply.code(200).send(userInfos));
	} catch (err) {
		const e = new Error("Error with Database");
		e.statusCode = 500;
		throw e;
	}
}
