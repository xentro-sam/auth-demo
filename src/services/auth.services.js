const db = require('../models');
const { getHash, verifyHash } = require('../utils/hash');
const { sign } = require('../utils/jwt');

const storeUserSecrets = async (username, password) => {
    const hash = getHash(password);
    const user = await db.Users.create({ username, password: hash });
    return user;
};

const loginUser = async (username, password) => {
    const user = await db.Users.findOne({ where: { username } });
    if (!user) {
        throw new Error('User not found');
    }
    const isValid = verifyHash(password, user.password);
    if (!isValid) {
        throw new Error('Invalid credentials');
    }
    const token = sign({ username: user.username });
    return token;
};

module.exports = {
    storeUserSecrets,
    loginUser
};