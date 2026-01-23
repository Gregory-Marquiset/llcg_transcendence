import { app, httpError } from '../chatServer.js';
import { getRowFromDB, getAllRowsFromDb, runSql } from '../../shared/postgresFunction.js'

export const createMessage = async function (req, reply) {
	try {
        console.log(`\ncreateMessage: typeof req.body: ${typeof req.body}\nreq.body: ${JSON.stringify(req.body)}\n`);
        let chatObj = req.body;

        if (typeof chatObj?.content !== "string")
            throw httpError(400, "Bad request");

        const areUsersInDB = await getAllRowsFromDb(app.pg, 'SELECT id FROM users WHERE id = $1 OR id = $2', [chatObj.fromUserId, chatObj.toUserId]);
        if (!areUsersInDB || areUsersInDB.length !== 2)
            throw httpError(404, "User not found");

        const areUsersFriends = await getRowFromDB(app.pg, `SELECT status FROM friendships WHERE (sender_id = $1 AND receiver_id = $2)
            OR (sender_id = $2 AND receiver_id = $1)`, [chatObj.fromUserId, chatObj.toUserId]);
        if (!areUsersFriends || areUsersFriends.status !== "accepted")
            throw httpError(403, "Users are not friends");

        let isMessageAlreadyInDB = await getRowFromDB(app.pg, `SELECT * FROM chat_history WHERE request_id = $1`, [chatObj.requestId]);
        if (!isMessageAlreadyInDB)
        {
            const res = await runSql(app.pg, `INSERT INTO chat_history (from_user_id, to_user_id, content, request_id, client_sent_at)
                VALUES ($1, $2, $3, $4, $5)`, [chatObj.fromUserId, chatObj.toUserId, chatObj.content, chatObj.requestId, chatObj.clientSentAt]);
            if (res !== 1)
                throw httpError(500, "Internal Server Error");
            isMessageAlreadyInDB = await getRowFromDB(app.pg, `SELECT * FROM chat_history WHERE request_id = $1`, [chatObj.requestId]);
            if (!isMessageAlreadyInDB)
                throw httpError(500, "Internal Server Error");
        }
        else
        {
            if (isMessageAlreadyInDB.content !== chatObj.content)
                throw httpError(409, "Conflict");
        }
        console.log(`\ncreateMessage isMessageAlreadyInDB element:\n
            id: ${isMessageAlreadyInDB.id}\n
            from_user_id: ${isMessageAlreadyInDB.from_user_id}\n
            to_user_id: ${isMessageAlreadyInDB.to_user_id}\n
            content: ${isMessageAlreadyInDB.content}\n
            requestId: ${isMessageAlreadyInDB.request_id}\n`);

        let responseObj = {
            messageId: isMessageAlreadyInDB.id,
            fromUserId: isMessageAlreadyInDB.from_user_id,
            toUserId: isMessageAlreadyInDB.to_user_id,
            content: isMessageAlreadyInDB.content,
            createdDate: new Date().toISOString(),
            requestId: isMessageAlreadyInDB.request_id 
        };
        // responseObj.messageId = isMessageAlreadyInDB.id;
        // responseObj.fromUserId = isMessageAlreadyInDB.from_user_id;
        // responseObj.toUserId = isMessageAlreadyInDB.to_user_id;
        // responseObj.content = isMessageAlreadyInDB.content;
        // responseObj.createMessage = new Date().toISOString();
        // responseObj.requestId = isMessageAlreadyInDB.request_id;
        
        return (reply.code(201).send(responseObj));
    
    } catch (err) {
        console.error(`\ncreateMessage error: ${err.message}\n`);
        if (err.statusCode)
            throw err;
        err.statusCode = 500;
        throw err;
    }
}
