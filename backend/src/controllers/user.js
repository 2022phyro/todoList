const UserDAO = require('../DAO/user');
const { isBlacklisted, blacklist } = require('../DAO/token')
const { UniqueConstraintError } = require('sequelize')
const { response } = require('../utils/formats');
const { createToken, refreshToken: refreshJWTToken } = require('../utils/tokens');
const { validateData, userSchema } = require('../utils/validate');
const { LoginError, NotFoundError, TokenError } = require('../utils/errors');

const MAX_AGE = Number(process.env.MAX_AGE) ||
async function createUser(req, res) {
  try {
    validateData(userSchema, req.body)
    const { email, password } = req.body;
    const user = await UserDAO.createUser(email, password);
    const tokens = createToken(user);
    res.cookie('refresh', tokens.refreshToken, { maxAge: MAX_AGE, httpOnly: true, sameSite: 'none', secure: true })
    res.status(201).json(response(201, tokens, {}));
  } catch (error) {
    if (error.message.startsWith('AJV Validation failed:')) {
      return res.status(400).json(400, {}, { error: error.message.split(':')[1] }); 
    } else if (error instanceof UniqueConstraintError) {
      return res.status(400).json(response(400, {}, { error: 'Email already exists' }));
    } else {
      console.error(error)
      res.status(500).json(response(500, {}, { error: "Something went wrong. Please try again later" }));
    }
  }
}

async function loginUser(req, res) {
  try {
    validateData(userSchema, req.body)
    const { email, password } = req.body;
    const user = await UserDAO.loginUser(email, password);
    const tokens = createToken(user);
    console.log(tokens, typeof MAX_AGE)
    res.cookie('refresh', tokens.refreshToken, { maxAge: MAX_AGE, httpOnly: true, sameSite: 'none', secure: true })
    console.log("refresh", res.cookie.refresh)
    res.status(200).json(tokens);
  } catch (error) {
    if (error.message.startsWith('AJV Validation failed:')) {
      return res.status(400).json(response(400, {}, { error: error.message })); 
    } else if (error instanceof LoginError) {
      return res.status(400).json(response(400, {}, { error: error.message})); 
    } else if (error instanceof NotFoundError) {
      return res.status(404).json(response(404, {}, { error: error.message})); 
    } else {
      console.error(error)
      return res.status(500).json(response(500, {}, { error: "Something went wrong. Please try again later" }));
    }  
  }
}

async function logout (req, res) {
  try {
    const refresh = req.cookies.refresh
    if (!refresh) {
      return res.status(400).json(response(400, {}, {error: 'Refresh token not found'}))
    }
    if (await isBlacklisted(refresh)) {
      return res.status(400).json(response(400, {}, { error: 'Token is blacklisted'}))
    }
    else {
      await blacklist(refresh, 'refresh')
      await blacklist(req.token, 'access')
    }
    res.clearCookie('refresh')
    res.status(204).json()
  } catch (error) {
      console.error(error)
      return res.status(500).json(response(500, {}, { error: "Something went wrong. Please try again later" }));
  }
}
async function getUser(req, res) {
  try {
    const { password, ...user} = req.user.toJSON();
    res.status(200).json(response(200, user, {}));
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(response(404, {}, { error: error.message})); 
    } else {
      console.error(error)
      return res.status(500).json(response(500, {}, { error: "Something went wrong. Please try again later" }));
    }    }
}

async function deleteUser(req, res) {
  try {
    const user = req.user
    await UserDAO.deleteUser(user.id);
    res.status(204).json();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json(response(404, {}, { error: error.message})); 
    } else {
      console.error(error)
      return res.status(500).json(response(500, {}, { error: "Something went wrong. Please try again later" }));
    } 
  }
}

async function refreshToken (req, res) {
  try {
    const refresh = req.cookies.refresh
		
    const tokens = await refreshJWTToken(refresh)
    res.cookie('refresh', tokens.refreshToken, { maxAge: MAX_AGE, httpOnly: true, sameSite: 'none', secure: true })
    return res.status(200).json(response(200, tokens, {}))
  } catch (error) {
    if (error instanceof TokenError) {
      res.status(400).json(response(400, {}, error.message))
    } else {
      res.status(500).json(response(500, {}, {error: error.message}))
    }
  }
}
module.exports = {
  createUser,
  loginUser,
  getUser,
  deleteUser,
  refreshToken,
  logout
}
