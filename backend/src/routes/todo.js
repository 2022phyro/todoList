const express = require('express');
const TodoController = require('../controllers/todo');
const { authenticateJWT } = require('../middleware/authenticate');

const router = express.Router();

router.get('', authenticateJWT, TodoController.listTodos);
router.post('', authenticateJWT, TodoController.createTodo);
router.delete('/:id', authenticateJWT, TodoController.deleteTodo);
router.post('/:id', authenticateJWT, TodoController.toggleTodo);
module.exports = router;
