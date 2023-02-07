const db = require('../models');
const { getHash, verifyHash } = require('../utils/hash');

const storeUserSecrets = async (username, password) => {
    const hash = getHash(password);
    const user = await db.Users.create({ username, password: hash });
    return user;
};

const loginUser = async (username, password) => {
};

module.exports = {
    storeUserSecrets,
    loginUser
};