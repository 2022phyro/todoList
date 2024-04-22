const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgres');

// Define the Todo model
const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

Todo.sync()
    .then(() => {
        console.log('Todo table created successfully.');
    })
    .catch((error) => {
        console.error('Error creating Todo table:', error);
    });

module.exports = Todo;