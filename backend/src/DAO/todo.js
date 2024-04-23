const Todo = require('../models/todo')
const { Op } = require('sequelize')
const { NotFoundError, NotPermittedError } = require('../utils/errors')


async function create(todoData) {
  try {
    const todo = await Todo.create(todoData)
    return todo
  } catch (error) {
    console.error('Error creating todo: ', error)
  }
}

async function list(filters, userId) {
	filters = filters || {}
    const where = {userId};

    if (filters.title) {
      where.title = { [Op.iLike]: `%${filters.title}%` };
    }

    if (filters.createdAt) {
      where.createdAt = { [Op.lte]: filters.createdAt };
    }

    const todos = await Todo.findAll({	
      where,
      order: [['createdAt', 'DESC']]
    });

    return todos;
}
async function deleteToDO(todoId, userId) {
    const result = await Todo.destroy({
			where: { id: todoId, userId: userId }
    })

    if (!result) {
      throw NotFoundError('No todo with this id found')
    }

    return result

}

async function toggleChecked(todoId, userId) {
    const todo = await Todo.findByPk(todoId)
    if (!todo) {
      throw NotFoundError('No todo with this id found')
    }
		if (todo.userId !== userId) {
			throw NotPermittedError('You are not the owner of this note')
		}

    todo.completed = !todo.completed
    await todo.save()

    return todo
}

module.exports = {
  create,
  list,
  delete: deleteToDO,
  toggleChecked
}
