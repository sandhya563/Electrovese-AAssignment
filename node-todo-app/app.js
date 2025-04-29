const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const sequelize = require('./config/db');
const redis = require('./config/redis');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/todo', todoRoutes);

// Connect MySQL
sequelize.sync().then(() => console.log('MySQL connected'));

// Connect Redis
redis.on('connect', () => console.log('Redis connected'));

module.exports = app;
