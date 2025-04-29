const Todo = require('../models/Todo');
const redis = require('../config/redis');
const moment = require('moment');
const { cacheUserTodos, getCachedUserTodos, invalidateUserTodoCache } = require('../utils/cacheUtil');

exports.createTodo = async (req, res) => {
    try {
        const { title, valid_date } = req.body;

        const todo = await Todo.create({
            user_id: req.user.id,
            title,
            valid_date
        });

        // Invalidate the cache for the user after creating a new todo
        await invalidateUserTodoCache(req.user.id);

        res.status(201).json({ message: 'Todo created successfully', todo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getTodos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        // First check if todos are cached
        let todos = await getCachedUserTodos(req.user.id, page, limit);

        if (!todos) {
            // If not cached, fetch from DB and cache them
            todos = await Todo.findAll({ where: { user_id: req.user.id }, order: [['createdAt', 'DESC']] });

            // Cache the todos for the user with the given page and limit
            await cacheUserTodos(req.user.id, page, limit, todos);
        }

        const paginatedTodos = todos.slice(offset, offset + limit);

        const timezoneOffset = req.timezoneOffset;
        const adjustedTodos = paginatedTodos.map(todo => ({
            ...todo,
            createdAt: moment(todo.createdAt).utcOffset(timezoneOffset * 60).format(),
            valid_date: moment(todo.valid_date).utcOffset(timezoneOffset * 60).format()
        }));

        res.json({ data: adjustedTodos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, valid_date } = req.body;

        await Todo.update(
            { title, valid_date },
            { where: { id, user_id: req.user.id } }
        );

        // Invalidate cache after updating todo
        await invalidateUserTodoCache(req.user.id);

        res.json({ message: 'Todo updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        await Todo.destroy({ where: { id, user_id: req.user.id } });

        // Invalidate cache after deleting todo
        await invalidateUserTodoCache(req.user.id);

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
