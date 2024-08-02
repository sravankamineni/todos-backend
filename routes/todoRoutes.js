const express = require('express');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

const todoRouter = express.Router();

todoRouter.use(authMiddleware)

todoRouter.post('/',  createTodo);
todoRouter.get('/',  getTodos);
todoRouter.put('/:id', updateTodo);
todoRouter.delete('/:id',deleteTodo);

module.exports = todoRouter;
