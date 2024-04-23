const bcrypt = require('bcrypt');
const User = require('../models/user');
const { NotFoundError, LoginError } = require('../utils/errors');
async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });
  return user;
}

async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError('No user found with this email');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new LoginError('Invalid password');
  }
  return user;
}
async function getUser(id) {
  const user = await User.findByPk(id);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  return user;
}
async function deleteUser(id) {
  const result = await User.destroy({ where: { id } });
  if (!result) {
    throw new NotFoundError('User not found');
  }
  return result;
}

module.exports = {
  createUser,
  loginUser,
  getUser,
  deleteUser
}