const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgres');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}
);
User.sync()
    .then(() => {
        console.log('User table synced successfully.');
    })
    .catch((error) => {
        console.error('Error creating User table:', error);
    });
module.exports = User;