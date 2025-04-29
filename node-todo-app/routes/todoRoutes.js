const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const timezoneHandler = require('../middlewares/timezoneMiddleware');
const { createTodo, getTodos, updateTodo, deleteTodo } = require('../controllers/todoController');

const router = express.Router();

router.post('/', authenticateToken, timezoneHandler, createTodo);
router.get('/', authenticateToken, timezoneHandler, getTodos);
router.put('/:id', authenticateToken, timezoneHandler, updateTodo);
router.delete('/:id', authenticateToken, timezoneHandler, deleteTodo);

module.exports = router;
