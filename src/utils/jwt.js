const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../jwt.config');

const sign = (payload) => {
    return jwt.sign(payload, JWT_SECRET);
}

const verify = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    sign,
    verify
};