import { httpError } from "../usersServer.js";
import { getRowFromDB, runSql } from '../../utils/sqlFunction.js'


export const sendFriendsRequest = async function (req, reply) {

	
	try {
		if (req.params === req.user.id)
			throw httpError(400, "Can't add yourself as friend");
	} catch (err)
	{
		console.error(`\nERROR sendFriendsRequest: ${err.message}\n`);
		if (err.statusCode)
			throw err;
		err.statusCode = 500;
		throw err;
	}
}
