import * as statisticsController from './statisticController.js'


export const getAllTodoOpts = {
    schema: {
        headers: {
            type: 'object',
            properties: {
                authorization: { type: 'string' }
            },
            required: ['authorization']
        },
        response : {
            200 : {
                type : 'array',
                items : {
                    type : 'object',
                    properties : {
                        id : {type : "integer"},
                        title : {type : "string" },
                        description : {type : "string" },
                        done : {type : "boolean"},
                        deadline : {type : "string"}
                    },
                }
            },
        },
    },
    handler: statisticsController.getAllTodo
}

export const postNewTodoOpts = {
    schema : {
        headers : {
            type: 'object',
            properties: {
                authorization: { type: 'string' }
            },
            required: ['authorization']
        },
        body : {
            type : 'object',
            properties : {
                    title : {type : "string" },
                    description : {type : "string" },
            },
            required: ['title']
        },
        response : {
            201 : {
                type : 'object',
                properties : {
                    id : { type : "integer"},
                }
            },
        },
    },
    handler : statisticsController.postNewTodo
}

export const deleteTodoOpts = {
    schema : {
        headers : {
            authorization : { type : "string"},
        },
        response : {
            200 : {
                type : "object"
            }
        } 
        
    }
}