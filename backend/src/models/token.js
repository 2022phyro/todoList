const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgres');

const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
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

module.exports = Token;