const jwt = require('jsonwebtoken')
const TokenDAO = require('../DAO/token')
const { response } = require('../utils/formats')
const { getUser } = require('../DAO/user')
const { verifyToken } = require('../utils/tokens')
const { NotFoundError } = require('../utils/errors')

async function authenticateJWT (req, res, next) {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const [bearer, token] = authHeader.split(' ')
    const accepted = process.env.BEARER.split(',')
    if (!accepted.includes(bearer) && !token) {
      return res.status(401).json(response(401, {}, { error: 'Invalid token' }))
    }
    if (await TokenDAO.isBlacklisted(token)) {
      return res.status(401).json(response(401, {}, { error: 'Token is blacklisted' }))
    }
    try {
      const [status, msg ] = verifyToken(token)
      if (!status) {
        return res.status(401).json(response(401, {}, { error: msg }))
      }
      const decoded = jwt.decode(token)
      console.log(decoded)
      const user = await getUser(decoded.sub)
      req.user = user
      req.token = token
      next()
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(404).json(response(404, {}, { error: error.message})); 
      } else {
        console.error(error)
        return res.status(401).json(response(401, {}, { error: "Invalid token" }));
      }  
    }
  } else {
    return res.status(401).json(response(401, {}, { error: 'No token provided' }))
  }
}

module.exports = {
  authenticateJWT
}

