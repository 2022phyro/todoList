const TodoDAO = require('../DAO/todo')
const supabaseClient = require('../config/supabase')
const validator = require('../utils/validate')
const { response } = require('../utils/formats')
async function createTodo (req, res) {
    try {
        const todoData = req.body
        // validator.validateData(validator.todoSchema, todoData)
        const todo =  await TodoDAO.create(todoData)
        res.status(201).json(response(200, todo, {}))
    } catch (error) {
        console.error(error)
        res.status(400).json(response(400, {}, error))
    }
}

async function listTodos (req, res) {
    try {
        const todos = await TodoDAO.list()
        res.status(200).json(response(200, todos, {}))
    } catch (error) {
        console.error(error)
        res.status(400).json(response(400, {}, error))
    }

}

async function deleteTodo (req, res) {
    try {
        await TodoDAO.delete(req.params.id)
        return res.status(204).json()
    } catch (error) {
        console.error(error)
        return res.status(400).json(response(400, {}, {
            message: 'Error deleting todo'
        }))
    }

}

async function toggleTodo (req, res) {
    try {
        const todo = await TodoDAO.toggleChecked(req.params.id)
        return res.status(200).json(response(200, todo, {}))
    } catch (error) {
        console.error(error)
        return res.status(400).json(response(400, {}, {
            message: 'Error toggling todo'
        }))
    }
}

module.exports = {
    listTodos,
    createTodo,
    deleteTodo,
    toggleTodo
}