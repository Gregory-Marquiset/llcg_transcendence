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
        console.error("ERROR: posting new todo :" , err)
        return reply.code(500).send({ error: 'Failed to create todo' });
    }
}

export const deleteTodo = async function (req, reply) {
    try {
        const response = await runSql(app.pg, `DELETE FROM todo_list WHERE id = $1 AND user_id = $2`, [req.params.id, req.user.id]);
        return reply.code(204).send();
    }
    catch (err){
        console.error("ERROR: deleting new todo :" , err);
        return reply.code(500).send({ error: 'Failed to delete todo' });
    }
}

export const markAsDone = async function (req, reply) {
    try {
        const id = await runSql(app.pg, `UPDATE todo_list SET done = $1 WHERE id = $2 AND user_id = $3 RETURNING *`, [req.body.done, req.params.id, req.user.id]);
        if (!id)
            return reply.code(404).send({error : "todo not found in data base"});
        return reply.code(204).send();
    }
    catch (err) {
        console.error("ERROR : mark as don todo :", err);
        return reply.code(500).send({ error : "Fail to mark as done"});
    }
}