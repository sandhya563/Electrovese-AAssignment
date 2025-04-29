const express = require('express');
const { body } = require('express-validator');
const { signup, login } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', [body('username').notEmpty(),body('password').isLength({ min: 5 }),body('image').notEmpty()], signup);

router.post('/login', [
    body('username').notEmpty(),
    body('password').notEmpty()
], login);

module.exports = router;
