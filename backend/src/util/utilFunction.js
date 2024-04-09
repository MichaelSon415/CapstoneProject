const jwt = require('jsonwebtoken');
const config = require('../../config/auth_config');

function getUserIdFromToken(token) {
    try {
        const decode = jwt.verify(token, config.secret);
        return decode.id;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

function getUserNameFromToken(token) {
    try {
        const decode = jwt.verify(token, config.secret);
        return decode.username;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}


module.exports = { getUserIdFromToken, getUserNameFromToken };