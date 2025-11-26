import { app } from '../../gateway/server.js'
import { user_db } from '../usersServer.js' 

export const authRegister = async function (req, reply) {
	console.log(`\n${JSON.stringify(req.body)}\n`);

	const now = new Date();
	const dateTime = `${now.getDate()}-${now.getMonth()}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

	const query = (sql, params) => {
		return (new Promise((resolve, reject) => {
			user_db.run(sql, params, (err) => {
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
			user_db.get(sql, params, (err, row) => {
				if (err)
					reject(err);
				resolve(row);
			});
		}));
	}

	const token_to_db = (sql, params) => {
		return (new Promise((resolve, reject) => {
			user_db.run(sql, params, (err) => {
				if (err)
					reject(err);
				resolve();
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

			const access_tok = app.jwt.sign({ userInfo }, { expiresIn: '5m' });
			const refresh_tok = app.jwt.sign({ userInfo }, { expiresIn: '7d' });

			console.log(`\naccess_token: ${access_tok}\nrefresh_token: ${refresh_tok}\n`);

			const add_to_db = await token_to_db(`INSERT INTO refreshed_tokens(user_id, token)
				VALUES (?, ?)`, [userInfo.id, refresh_tok]);

			return (reply.
				setCookie('refreshToken', refresh_tok, {
					httpOnly: true,
					path: '/',
					maxAge: 7 * 24 * 60 * 60
				})
				.code(200)
				.send( { access_token: access_tok }));
		}
		const err = new Error("Invalid email or password");
		err.statusCode = 401;
		throw err;
	} catch (err) {
		if(err.statusCode)
			throw err;
		err.statusCode = 500;
		throw err;
	}
}


//le front met un header dans la req: Authorization: Bearer <token>
export const authMe = async function (req, reply) {
	console.log(`\n${JSON.stringify(req.user)}\n`);

	const query = (sql, params) => {
		return (new Promise((resolve, reject) => {
			user_db.get(sql, params, (err, row) => {
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



export const authLogout = async function (req, reply) {
	const query = (sql, params) => {
		return (new Promise((resolve, reject) => {
			user_db.run(sql, params, (err) => {
				if (err)
					reject(err);
				resolve();
			});
		}));
	}

	try {
		//console.log(`\n${req.cookies.refreshToken}\n`);
		const result = await query(`DELETE FROM refreshed_tokens WHERE token = ?`, req.cookies.refreshToken);
		return (reply.clearCookie('refreshToken', {path: '/' })
		.code(204)
		.send({ message: "User successfully logout" }));
	} catch (err) {
		const e = new Error("Error with suppression in Database");
		e.statusCode = 500;
		throw e;
	}
}