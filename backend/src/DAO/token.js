const Token = require('../models/token');

async function blacklist(key, type) {
    try {
        await Token.create({key, type})
    } catch (error) {
        console.error('Error blacklisting token:', error);
    }
}

async function isBlacklisted(key) {
    try {
        const token = await Token.findOne({ where: { key: key } })
        return token !== null        
    } catch (error) {
        return false
    }
}

module.exports = {
    blacklist,
    isBlacklisted
};