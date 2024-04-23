const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgres');
const User = require('./user')
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
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
});

Todo.sync()
    .then(() => {
        console.log('Todo table synced successfully.');
    })
    .catch((error) => {
        console.error('Error creating Todo table:', error);
    });

module.exports = Todo;
