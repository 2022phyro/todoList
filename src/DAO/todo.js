const Todo = require('../models/todo')

async function create(todoData) {
  try {
    const todo = await Todo.create(todoData)
    return todo
  } catch (error) {
    console.error('Error creating todo: ', error)
  }
}

async function list() {
  try {
    const todos = await Todo.findAll()
    return todos
  } catch (error) {
    console.error('Error fetching todos: ', error)
  }
}

async function deleteToDO(todoId) {
  try {
    const result = await Todo.destroy({
      where: { id: todoId }
    })

    if (!result) {
      console.error('Error deleting todo: No todo with this id found')
      return
    }

    return result
  } catch (error) {
    console.error('Error deleting todo: ', error)
  }
}

async function toggleChecked(todoId) {
  try {
    const todo = await Todo.findByPk(todoId)

    if (!todo) {
      console.error('Error fetching todo: No todo with this id found')
      return
    }

    todo.completed = !todo.completed
    await todo.save()

    return todo
  } catch (error) {
    console.error('Error toggling todo checked status: ', error)
  }
}

module.exports = {
  create,
  list,
  delete: deleteToDO,
  toggleChecked
}