const bcrypt = require('bcrypt');
const { User } = require('./models/user');

async function createUser(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });
  return user;
}

async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('No user found with this email');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Invalid password');
  }

  return user;
}
async function getUser(id) {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error('No user found with this id');
  }

  return user;
}
async function deleteUser(email) {
  const result = await User.destroy({ where: { email } });

  if (!result) {
    throw new Error('No user found with this email');
  }

  return result;
}

module.exports = {
  createUser,
  loginUser,
  getUser,
  deleteUser
}