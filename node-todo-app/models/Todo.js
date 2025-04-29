const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');  // importing User model

const Todo = sequelize.define('Todo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' }},
    title: { type: DataTypes.STRING },
    valid_date: { type: DataTypes.DATE }
}, { timestamps: true });

Todo.belongsTo(User, { foreignKey: 'user_id' });  // Relation between Todo and User

module.exports = Todo;
