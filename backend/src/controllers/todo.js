const TodoDAO = require('../DAO/todo')
const supabaseClient = require('../config/supabase')
const validator = require('../utils/validate')
const { response } = require('../utils/formats')
const { NotFoundError, NotPermittedError } = require('../utils/errors')

async function createTodo (req, res) {
    try {
        const todoData = req.body
        todoData.userId = req.user.id
        validator.validateData(validator.todoSchema, todoData)
        const todo =  await TodoDAO.create(todoData)
        res.status(201).json(response(200, todo, {}))
    } catch (error) {
        console.error(error)
        res.status(400).json(response(400, {}, error))
    }
}

async function listTodos (req, res) {
    try {
				const { title, createdAt, page } = req.query
        const todos = await TodoDAO.list({title, createdAt}, req.user.id, page)
        res.status(200).json(response(200, todos, {}))
    } catch (error) {
        console.error(error)
        res.status(400).json(response(400, {}, error))
    }

}

async function deleteTodo (req, res) {
    try {
        await TodoDAO.delete(req.params.id, req.user.id)
        return res.status(204).json()
		} catch (error) {
			if (error instanceof NotFoundError) {
					return res.status(404).json(response(404, {}, { error: error.message})); 
			} else if (error instanceof NotPermittedError) {
					return res.status(403).json(response(403, {}, { error: error.message})); 
			}  else {
					console.error(error)
					return res.status(500).json(response(500, {}, { error: "Something went wrong. Please try again later" }));
    }

}
}

async function toggleTodo (req, res) {
    try {
        const todo = await TodoDAO.toggleChecked(req.params.id, req.user.id)
        return res.status(200).json(response(200, todo, {}))
    } catch (error) {
			if (error instanceof NotFoundError) {
					return res.status(404).json(response(404, {}, { error: error.message})); 
			} else if (error instanceof NotPermittedError) {
					return res.status(403).json(response(403, {}, { error: error.message})); 
			}  else {
					console.error(error)
					return res.status(500).json(response(500, {}, { error: "Something went wrong. Please try again later" }));
        }
    }
}

module.exports = {
    listTodos,
    createTodo,
    deleteTodo,
    toggleTodo
}
