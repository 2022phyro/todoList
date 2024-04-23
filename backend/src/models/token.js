const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgres');

const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  key: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  indexes: [
    {
      fields: ['key']
    }
  ]
});
Token.sync()
    .then(() => {
        console.log('Token table created successfully.');
    })
    .catch((error) => {
        console.error('Error creating Token table:', error);
    });

module.exports = Token;