const jwt = require('jsonwebtoken');
const User = require('../DAO/user')
const JWT_SECRET = 'your-secret-key'
const { isBlacklisted, blacklist } = require('../DAO/token')

function createToken (user) {
    const iat = Math.floor(Date.now() / 1000)
    const accessTokenExpiry = iat + 60 * 60 // 1 hour from now
    const refreshTokenExpiry = iat + 60 * 60 * 24 * 7 // 7 days from now
  
    const payload = {
      sub: user._id,
      iat
    }
  
    const accessToken = jwt.sign({ ...payload, type: 'access' }, JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' })
    const refreshToken = jwt.sign({ ...payload, type: 'refresh' }, JWT_SECRET, { expiresIn: '7d', algorithm: 'HS256' })
  
    return {
      accessToken,
      refreshToken,
      access_iat: new Date(issuedAt * 1000).toISOString(),
      refresh_iat: new Date(issuedAt * 1000).toISOString(),
      access_exp: new Date(accessTokenExpiry * 1000).toISOString(),
      refresh_exp: new Date(refreshTokenExpiry * 1000).toISOString()
    }
  }
  
  async function refreshToken (oldRefreshToken) {
    try {
      if (await isBlacklisted(oldRefreshToken, 'refresh')) {
        throw new Error('Token is blacklisted')
      }
      const decoded = jwt.decode(oldRefreshToken)
      if (!decoded && !decoded.type === 'refresh') {
        throw new Error('Invalid refresh token')
      }
      const user = await User.findByPk(decoded.sub)
      if (!user) {
        throw new Error('User not found')
      }
      jwt.verify(oldRefreshToken,JWT_SECRET, { algorithms: ['HS256'] })
      const newTokens = createToken(user)
      await blacklist(decoded.sub, oldRefreshToken, 'refresh')
      return newTokens
    } catch (error) {
      throw new Error('Invalid refresh token')
    }
  }
  
module.exports = {
  createToken,
  refreshToken
}