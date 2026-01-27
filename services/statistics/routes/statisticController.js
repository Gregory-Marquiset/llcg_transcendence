import { app, httpError } from "../statisticsServer.js";
import { getRowFromDB, getAllRowsFromDb, runSql } from '../../shared/postgresFunction.js'

export const getAllTodo = async function (req, reply) {
    try {
        const list = await getAllRowsFromDb(
            app.pg, `SELECT * FROM todo_list WHERE user_id = $1`, [req.user.id]);
        console.log(`Todo list for user ${req.user.id}:`, list);
        return reply.code(200).send(list);
    }
    catch (err) {
        console.error("Error getting todo list:", err);
        return reply.code(500).send({ error: 'Failed to fetch todos' });
    }
}

export const postNewTodo = async function (req, reply) {
    try {
        const id = await runSql(app.pg, `INSERT INTO todo_list (user_id, title, description)
                VALUES ($1, $2, $3) RETURNING id`, [req.user.id, req.body.title, req.body.description]);
        return reply.code(201).send({id})
    }
    catch (err){
        console.error("While posting new todo :" , err)
        return reply.code(500).send({ error: 'Failed to create todo' });
    }
}