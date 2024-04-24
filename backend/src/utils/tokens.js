const jwt = require('jsonwebtoken');
const User = require('../DAO/user')
const JWT_SECRET = process.env.JWT_SECRET
const { isBlacklisted, blacklist } = require('../DAO/token');
const { TokenError } = require('./errors');

function createToken (user) {
    const iat = Math.floor(Date.now() / 1000)
    const accessTokenExpiry = iat + 60 * 60 // 1 hour from now
    const refreshTokenExpiry = iat + 60 * 60 * 24 * 7 // 7 days from now
  
    const payload = {
      sub: user.id,
      iat
    }
  
    const accessToken = jwt.sign({ ...payload, type: 'access' }, JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' })
    const refreshToken = jwt.sign({ ...payload, type: 'refresh' }, JWT_SECRET, { expiresIn: '7d', algorithm: 'HS256' })
  
    return {
      accessToken,
      refreshToken,
      access_iat: new Date(iat * 1000).toISOString(),
      refresh_iat: new Date(iat * 1000).toISOString(),
      access_exp: new Date(accessTokenExpiry * 1000).toISOString(),
      refresh_exp: new Date(refreshTokenExpiry * 1000).toISOString()
    }
  }
  
  async function refreshToken (oldRefreshToken) {
    try {
      if (!oldRefreshToken) {
        throw new TokenError('No refresh token provided')
      }
      if (await isBlacklisted(oldRefreshToken, 'refresh')) {
        throw new TokenError('Token is blacklisted')
      }
      const decoded = jwt.decode(oldRefreshToken)
      if (!decoded || !decoded.type === 'refresh') {
        throw new TokenError('Invalid refresh token')
      }
      const user = await User.getUser(decoded.sub)
      if (!user) {
        throw new TokenError('User not found')
      }
      jwt.verify(oldRefreshToken,JWT_SECRET, { algorithms: ['HS256'] })
      const newTokens = createToken(user)
      await blacklist(decoded.sub, oldRefreshToken, 'refresh')
      return newTokens
    } catch (error) {
      throw new TokenError('Invalid refresh token')
    }
  }
  
  function verifyToken(token) {
    try {
      jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
      return [true, ''];
    } catch (error) {
      return [false, 'Invalid token'];
    }
  }
module.exports = {
  createToken,
  refreshToken,
  verifyToken
}