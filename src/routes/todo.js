const express = require('express');
const TodoController = require('../controllers/todo');

const router = express.Router();

router.get('', TodoController.listTodos);
router.post('', TodoController.createTodo);
router.delete('/:id', TodoController.deleteTodo);
router.post('/:id', TodoController.toggleTodo);

module.exports = router;